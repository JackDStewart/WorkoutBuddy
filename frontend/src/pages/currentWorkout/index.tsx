import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Modal from "@/components/Modal"; // need modal component for popup
import { SingleAutocomplete } from "@/components/Autocomplete";
import { Workout, SetLog, ExerciseLog, WorkoutLog } from "@/types";
import ExerciseCard from "@/components/ExerciseCard";
import { fetchWorkoutById, createWorkout } from "@/api/workoutApi";
import { saveExerciseLogs } from "@/api/exerciseLogApi";
import ProfileClient from "@/components/ProfileClient";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { fetchExercises } from "@/api/exerciseApi";
import { Exercise } from "@/types";

function Current() {
  const { user, isLoading } = useUser();
  const [isModal1Open, setIsModal1Open] = useState(false);
  const router = useRouter();
  const openModal1 = () => {
    setIsModal1Open(true);
  };
  const closeModal1 = () => {
    setIsModal1Open(false);
  };

  const [isModal2Open, setIsModal2Open] = useState(false);
  const openModal2 = () => {
    setIsModal2Open(true);
  };
  const closeModal2 = () => {
    setIsModal2Open(false);
  };

  const [isModal3Open, setIsModal3Open] = useState(false);
  const openModal3 = () => {
    setIsModal3Open(true);
  };
  const closeModal3 = () => {
    setIsModal3Open(false);
  };

  const [cur, setCur] = useState<string | null>(null);
  const [workout, setWorkout] = useState<Workout>();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutName, setWorkoutName] = useState<string>("");

  useEffect(() => {
    const getExercises = async () => {
      const fetchedExercises = await fetchExercises();
      setExercises(fetchedExercises);
    };
    getExercises();
  }, []);

  useEffect(() => {
    const { workoutId } = router.query;
    console.log("workout id= " + workoutId);
    if (workoutId) {
      if (workoutId === "NewWorkout") {
        const newWorkout: Workout = {
          name: "",
          exercises: [],
          favorite: false,
        };
        setWorkout(newWorkout);
        openModal3();
      } else {
        const fetchWorkout = async () => {
          const workoutData = await fetchWorkoutById(Number(workoutId));
          if (workoutData) {
            setWorkout(workoutData);
            if (workoutData?.exercises) {
              let logs =
                workoutData.exercises?.map((exercise) => ({
                  exercise,
                  sets: [],
                  date: new Date(),
                })) || [];
              setExerciseList(logs);
            }
          }
        };
        fetchWorkout();
      }
    }
  }, [router.query]);

  const [exerciseList, setExerciseList] = useState<ExerciseLog[]>(
    workout?.exercises?.map((exercise) => ({
      exercise,
      sets: [],
      date: new Date(),
    })) || []
  );
  //let exerciseList = workout.exercises;

  const addNewExercise = (exerciseStr: string | null) => {
    if (exerciseStr === null) {
      return;
    }

    const newExercise = exercises.filter(
      (exercise) => exercise.name == exerciseStr
    )[0];
    console.log("NEW:", newExercise);

    //search database for matching exercise name and use that as input to exerciseLog.exercise
    const newExerciseLog: ExerciseLog = {
      exercise: newExercise,
      sets: [],
      date: new Date(),
    };
    setExerciseList((prev) => [...prev, newExerciseLog]);
    closeModal1();
  };

  const delExercise = (exercise: ExerciseLog) => {
    setExerciseList(exerciseList.filter((x) => x != exercise));
  };

  const updateSets = (index: number, newSetLogs: SetLog[]) => {
    const updatedExerciseLogs = [...exerciseList];
    updatedExerciseLogs[index] = {
      ...updatedExerciseLogs[index],
      sets: newSetLogs,
    };
    setExerciseList(updatedExerciseLogs);
  };

  const getButtonClasses = () => {
    // Check if the list is odd or even and assign column start accordingly
    if (exerciseList.length % 2 === 0) {
      return "col-span-2 justify-self-center"; // Centers the button across both columns
    } else {
      return "col-start-2"; // Places button in the second column
    }
  };
  const saveExercises = async () => {
    const validExercises = exerciseList.filter(
      (exercise) =>
        exercise.sets &&
        exercise.sets.length > 0 &&
        exercise.sets.every((setLog) => setLog.reps !== 0)
    );

    if (user?.sub) {
      const auth0id = user.sub;
      validExercises.forEach((exercise) => {
        exercise.userAuth0Id = auth0id;
      });

      try {
        await saveExerciseLogs(validExercises); // Wait until the save is complete
        router.push("/home"); // Route back to the home page
      } catch (error) {
        console.error("Error saving exercises:", error);
        // Optionally, display an error message or handle error here
      }
    }
  };

  const handleSaveWorkoutName = () => {
    if (workout) {
      setWorkout({ ...workout, name: workoutName }); // Update workout name
      closeModal3(); // Close the modal
    }
  };

  return (
    <div>
      <Header />
      <ProfileClient />
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">{workout?.name}</h2>
        </div>
        <div className="grid grid-cols-2 gap-10 ">
          {exerciseList.map((exerciseLog, index) => (
            <ExerciseCard
              key={exerciseLog.exercise.name}
              exerciseLog={exerciseLog}
              onSetChange={(newSetLogs) => updateSets(index, newSetLogs)}
              onDelete={(exercise: ExerciseLog) => delExercise(exercise)}
            />
          ))}
          {exerciseList.length === 0 && (
            <div className="justify-center place-self-center col-span-2 text-grey">
              <p className="text-grey-800 text-xl">Add an exercise!</p>
            </div>
          )}
          <button
            className={`${getButtonClasses()} bg-purple text-4xl font-medium place-self-center text-black py-4 px-6 rounded-full`}
            onClick={() => openModal1()} //modal pop-up
          >
            +
          </button>
        </div>
        <br />
        <div className="mt-5 place-items-center">
          <button
            //accumulate data into WorkoutLog and POST
            onClick={openModal2}
            className="flex justify-center self-center
        w-[350px] pt-2 pb-2 rounded-full text-2xl mt-5 bg-purple border-none transition-transform
        duration-500 hover:bg-transitionPurple hover:scale-125"
          >
            Finish Workout
          </button>
        </div>
      </div>
      {/*modal1, for selecting exercise to add */}
      <Modal isOpen={isModal1Open} onClose={closeModal1} width={"w-[350px]"}>
        <div>
          <h2 className="text-xl font-bold mb-4">Add an Excersise:</h2>
          <SingleAutocomplete
            label="Exercise"
            data={exercises.map((exercise) => exercise.name)}
            onExerciseChange={setCur}
          ></SingleAutocomplete>
          <br />
          <div className="flex justify-center">
            <button
              className="bg-purple text-lg font-medium text-black py-2 px-4 rounded-full w-1/2 }"
              onClick={() => addNewExercise(cur)}
            >
              Add Exercise
            </button>
          </div>
        </div>
      </Modal>
      {/* Modal2, for confirming workout save */}
      <Modal isOpen={isModal2Open} onClose={closeModal2} width={"w-[350px]"}>
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-xl font-bold mb-4 text-center">
            Are you sure you want to finish?
          </h2>
          <button
            className="bg-purple text-lg font-medium text-black py-2 px-4 rounded-full w-1/2"
            onClick={saveExercises}
          >
            Confirm
          </button>
        </div>
      </Modal>
      {/*Modal3, name for new workout*/}
      <Modal
        closeButton={false}
        isOpen={isModal3Open}
        onClose={() => setIsModal3Open(false)}
        width={"w-[350px]"}
      >
        <div className="flex flex-col justify-center items-center h-full">
          <h2 className="text-xl font-bold mt-2 mb-6 text-center">
            Enter a name for your workout:
          </h2>
          <input
            type="text"
            required
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="text-black w-full p-2 border rounded"
          />
          <button
            className="bg-purple text-lg font-medium text-black py-2 px-4 rounded-full w-1/2 mt-4"
            onClick={handleSaveWorkoutName}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default withPageAuthRequired(Current);
