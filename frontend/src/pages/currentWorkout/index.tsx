import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Modal from "@/components/Modal"; // need modal component for popup
import { SingleAutocomplete } from "@/components/Autocomplete";
import { Workout, SetLog, ExerciseLog, WorkoutLog } from "@/types";
import ExerciseCard from "@/components/ExerciseCard";

const Current = (/*workout: Workout*/) => {
  const [isModal1Open, setIsModal1Open] = useState(false);
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
  const [cur, setCur] = useState<string | null>(null);

  const router = useRouter();
  //let { workout } = router.query; // Get the selected workout from query parameters

  let workout: Workout = {
    name: "Full Body Workout",
    exercises: [
      { name: "Push-up" },
      { name: "Squat" },
      { name: "Plank" },
      { name: "Lat Pulldown" },
      { name: "Bicep Curls" },
    ],
    isFavorite: false,
  };

  const [exerciseList, setExerciseList] = useState<ExerciseLog[]>(
    workout.exercises.map((exercise) => ({
      exercise,
      sets: [],
      date: new Date(),
    }))
  );
  //let exerciseList = workout.exercises;

  const addNewExercise = (exerciseStr: string | null) => {
    if (exerciseStr === null) {
      return;
    }
    //search database for matching exercise name and use that as input to exerciseLog.exercise
    const newExercise: ExerciseLog = {
      exercise: { name: exerciseStr }, // Default values for the new set
      sets: [],
      date: new Date(),
    };
    setExerciseList((prev) => [...prev, newExercise]);
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
  const postWorkoutLog = async (workoutLog: WorkoutLog) => {
    fetch("api.address.here", {
      //inset API address
      method: "post",
      body: JSON.stringify(workoutLog),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Ensure you parse the response as JSON
      })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const saveWorkoutLog = () => {
    let newWorkoutLog: WorkoutLog = {
      name: workout.name,
      exercises: exerciseList,
    };
    postWorkoutLog(newWorkoutLog);
  };

  return (
    <div>
      <Header />
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">{workout.name}</h2>
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
            <div className="justify-center place-self-center col-start-2 text-grey">
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
            data={["exercise1", "exercise2"]} //implement api call to get all exercises here
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
            onClick={saveWorkoutLog}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Current;
