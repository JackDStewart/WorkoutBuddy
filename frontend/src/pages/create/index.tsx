// Import necessary modules and hooks
import React, { useState } from "react";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SingleAutocomplete } from "@/components/Autocomplete";
import AddedExercise from "@/components/AddedExercise";
import { getWorkouts } from "../../mockRest";
import MuscleGroupSelector from "@/components/MuscleGroupSelector";
import EquipmentSelector from "@/components/EquipmentSelector";
import { createWorkout } from "@/api/workoutApi";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import ProfileClient from "@/components/ProfileClient";

const Create = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const [muscleGroups] = useState<string[]>([
    "Abs",
    "Adductors",
    "Abductors",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
    "Glutes",
    "Hamstrings",
    "Lats",
    "Lower Back",
    "Middle Back",
    "Traps",
    "Quads",
    "Shoulders",
    "Triceps",
  ]);
  const [equipmentOptions] = useState<string[]>([
    "None",
    "Barbell",
    "Dumbbell",
    "Kettlebell",
    "Medicine Ball",
    "Machine",
    "Resistance Band",
    "Cable",
    "Other",
  ]);
  const [addedExercises, setAddedExercises] = useState<string[]>([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
    []
  );
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState<string>("");

  // Modal state
  const [modalSelectedMuscleGroups, setModalSelectedMuscleGroups] = useState<
    string[]
  >([]);
  const [modalSelectedEquipment, setModalSelectedEquipment] = useState<
    string[]
  >([]);

  // Fetch workouts and exercises
  const workouts = getWorkouts();
  const exercises = workouts.flatMap((workout) => workout.exercises);
  let exerciseNames = Array.from(
    new Set(exercises.map((exercise) => exercise.name))
  );

  // Handler functions for muscle groups and equipment
  const handleMuscleSelectOption = (option: string) => {
    if (!selectedMuscleGroups.includes(option)) {
      setSelectedMuscleGroups([...selectedMuscleGroups, option]);
    }
  };

  const handleMuscleRemoveOption = (option: string) => {
    setSelectedMuscleGroups(
      selectedMuscleGroups.filter((selected) => selected !== option)
    );
  };

  const handleEquipmentSelectOption = (option: string) => {
    if (!selectedEquipment.includes(option)) {
      setSelectedEquipment([...selectedEquipment, option]);
    }
  };

  const handleEquipmentRemoveOption = (option: string) => {
    setSelectedEquipment(
      selectedEquipment.filter((selected) => selected !== option)
    );
  };

  // Handler to add exercises
  const handleExerciseAdd = (exercise: string | null) => {
    if (exercise && !addedExercises.includes(exercise)) {
      setAddedExercises([...addedExercises, exercise]);
      console.log("Selected Exercises:", exercise);
    }
  };

  // Handlers for modal selections
  const handleModalMuscleSelectOption = (option: string) => {
    if (!modalSelectedMuscleGroups.includes(option)) {
      setModalSelectedMuscleGroups([...modalSelectedMuscleGroups, option]);
    }
  };

  const handleModalMuscleRemoveOption = (option: string) => {
    setModalSelectedMuscleGroups(
      modalSelectedMuscleGroups.filter((selected) => selected !== option)
    );
  };

  const handleModalEquipmentSelectOption = (option: string) => {
    if (!modalSelectedEquipment.includes(option)) {
      setModalSelectedEquipment([...modalSelectedEquipment, option]);
    }
  };

  const handleModalEquipmentRemoveOption = (option: string) => {
    setModalSelectedEquipment(
      modalSelectedEquipment.filter((selected) => selected !== option)
    );
  };

  // Handler to save custom exercise
  const handleSaveExercise = () => {
    const selectedMuscleGroups = modalSelectedMuscleGroups;
    const selectedEquipment = modalSelectedEquipment;

    if (!customExerciseName.trim()) {
      alert("Please enter an exercise name.");
      return;
    }

    // Ensure muscle groups and equipment are valid
    const validatedMuscleGroups = selectedMuscleGroups.filter((mg) =>
      muscleGroups.includes(mg)
    );
    const validatedEquipment = selectedEquipment.filter((eq) =>
      equipmentOptions.includes(eq)
    );

    const customExercise = {
      name: customExerciseName,
      muscleGroup:
        validatedMuscleGroups.length > 0
          ? validatedMuscleGroups.join(", ")
          : "Other",
      equipment:
        validatedEquipment.length > 0 ? validatedEquipment.join(", ") : "None",
    };

    setAddedExercises([...addedExercises, customExerciseName]);
    console.log("Saved Custom Exercise:", customExercise);

    // Optionally make an API call to save the custom exercise here

    //closeModal();
  };

  const handleSaveWorkout = async () => {
    const workoutName = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    )?.value;

    if (!workoutName || workoutName.trim() === "") {
      alert("Please enter a workout name.");
      return;
    }

    const workoutExercises = addedExercises
      .map((exerciseName) => {
        const matchedExercise = workouts
          .flatMap((workout) => workout.exercises)
          .find((exercise) => exercise.name === exerciseName);

        if (matchedExercise) {
          // Validate muscleGroup
          const muscleGroup = muscleGroups.includes(matchedExercise.muscleGroup)
            ? matchedExercise.muscleGroup
            : "Other";

          // Validate equipment
          const equipment = equipmentOptions.includes(matchedExercise.equipment)
            ? matchedExercise.equipment
            : "None";

          return {
            name: exerciseName,
            equipment: equipment,
            muscleGroup: muscleGroup,
          };
        }
        return undefined;
      })
      .filter((exercise) => exercise !== undefined) as {
      name: string;
      equipment: string;
      muscleGroup: string;
    }[];

    if (workoutExercises.length === 0) {
      alert("No valid exercises added.");
      return;
    }

    if (user?.sub) {
      const workout = {
        name: workoutName,
        exercises: workoutExercises,
        favorite: true,
        auth0id: user?.sub,
      };

      try {
        await createWorkout(workout);
        alert("Workout saved successfully!");
        router.push("/home");
      } catch (error) {
        console.error("Error saving workout:", error);
        alert("There was an error saving your workout. Please try again.");
      }
    }
  };

  return (
    <div>
      <Header />
      <ProfileClient />
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex">
          <div className="w-1/2 p-4">
            <h2 className="block text-white text-sm mb-1">Workout Name</h2>
            <input
              type="text"
              placeholder="Ex: Chest and Back Day"
              className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple"
            />

            <MuscleGroupSelector
              selectedMuscleGroups={selectedMuscleGroups}
              muscleGroups={muscleGroups}
              onSelect={handleMuscleSelectOption}
              onRemove={handleMuscleRemoveOption}
            />

            <EquipmentSelector
              selectedEquipment={selectedEquipment}
              equipment={equipmentOptions}
              onSelect={handleEquipmentSelectOption}
              onRemove={handleEquipmentRemoveOption}
            />

            <h2 className="block text-white text-sm mb-1 mt-8">
              Search and Add Exercises
            </h2>
            <div className="w-full">
              <SingleAutocomplete
                label="Exercise"
                data={exerciseNames.filter(
                  (exerciseName) => !addedExercises.includes(exerciseName)
                )}
                onExerciseChange={handleExerciseAdd}
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center text-white rounded-full px-3 py-1 mr-2 mb-1 border hover:text-black hover:bg-white mt-10"
            >
              Create Custom Exercise
            </button>

            <button
              onClick={handleSaveWorkout} // Save the workout when clicking this button
              className="bg-purple hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg mt-5"
            >
              Save Workout
            </button>
          </div>
          <div className="w-1/2 p-4 ml-auto">
            <h2 className="font-bold text-2xl border-b-2">Added Exercises</h2>
            <AddedExercise
              exercises={addedExercises}
              addedList={addedExercises}
              setter={setAddedExercises}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="w-[400px]"
      >
        <div>
          <h2 className="font-bold text-xl mb-4">Create Custom Exercise</h2>
          <h2 className="block text-white text-sm mb-1">Exercise Name</h2>
          <input
            type="text"
            placeholder="Ex: Oscillating Owens"
            className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple"
            value={customExerciseName}
            onChange={(e) => setCustomExerciseName(e.target.value)}
          />

          <MuscleGroupSelector
            selectedMuscleGroups={modalSelectedMuscleGroups}
            muscleGroups={muscleGroups}
            onSelect={handleModalMuscleSelectOption}
            onRemove={handleModalMuscleRemoveOption}
          />

          <EquipmentSelector
            selectedEquipment={modalSelectedEquipment}
            equipment={equipmentOptions}
            onSelect={handleModalEquipmentSelectOption}
            onRemove={handleModalEquipmentRemoveOption}
          />

          <button
            onClick={handleSaveExercise}
            className="bg-purple hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg mt-5"
          >
            Save Exercise
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Create;
