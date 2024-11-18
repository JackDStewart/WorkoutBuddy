import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import AddedExercise from "@/components/AddedExercise";
import ProfileClient from "@/components/ProfileClient";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { fetchExercises } from "@/api/exerciseApi";
import { Exercise, Workout } from "@/types";
import MuscleGroupSelector from "@/components/MuscleGroupSelector";
import EquipmentSelector from "@/components/EquipmentSelector";
import { createWorkout } from "@/api/workoutApi";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";


const Generate = () => {
  const { user, isLoading } = useUser();

  const muscleGroups = [
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
  ];
  const equipmentOptions = [
    "None",
    "Barbell",
    "Dumbbell",
    "Kettlebell",
    "Medicine Ball",
    "Machine",
    "Resistance Band",
    "Cable",
    "Other",
  ];

  const router = useRouter();

  const [equipment] = useState<string[]>(["Barbell", "Dumbells", "Machine"]);
  const [addedExercises, setAddedExercises] = useState<string[]>([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
    []
  );
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [numExercises, setNumExercises] = useState<number>(6);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);


  useEffect(() => {
    const getExercises = async () => {
      const fetchedExercises = await fetchExercises();
      setExercises(fetchedExercises);
    };
    getExercises();
  }, []);

  useEffect(() => {
    const filterExercises = () => {
      if (selectedMuscleGroups.length === 0 && selectedEquipment.length === 0) {
        setFilteredExercises(exercises);
      } else {
        const filtered = exercises.filter((exercise) => {
          const matchesMuscleGroup = selectedMuscleGroups.length === 0 || 
            selectedMuscleGroups.includes(formatToTitleCase(exercise.muscleGroup));
          const matchesEquipment = selectedEquipment.length === 0 || 
            selectedEquipment.includes(formatToTitleCase(exercise.equipment));
          return matchesMuscleGroup && matchesEquipment;
        });
        setFilteredExercises(filtered);
      }
    };
    filterExercises();
  }, [selectedMuscleGroups, selectedEquipment, exercises]);

  const formatToTitleCase = (value: string) => {
    return value
      .toLowerCase()
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleMuscleSelectOption = (option: string) => {
    // Add the option to the selected muscleGroups list if it's not already there
    if (!selectedMuscleGroups.includes(option)) {
      setSelectedMuscleGroups([...selectedMuscleGroups, option]);
    }
  };

  const handleMuscleRemoveOption = (option: string) => {
    // Remove the option from the selected muscleGroups list
    setSelectedMuscleGroups(
      selectedMuscleGroups.filter((selected) => selected !== option)
    );
  };

  const handleEquipmentSelectOption = (option: string) => {
    // Add the option to the selected muscleGroups list if it's not already there
    if (!selectedEquipment.includes(option)) {
      setSelectedEquipment([...selectedEquipment, option]);
    }
  };

  const handleEquipmentRemoveOption = (option: string) => {
    // Remove the option from the selected muscleGroups list
    setSelectedEquipment(
      selectedEquipment.filter((selected) => selected !== option)
    );
  };

  const getRandomUniqueSelections = (numSelections: number) => {
    const shuffled = [...filteredExercises].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSelections);
  };

  const handleGenerate = () => {
    const selectedExercises = getRandomUniqueSelections(numExercises);
    if (selectedExercises.length === 0) {
      console.log("No exercises with selected filters.");
      alert("No Exercises match current filters. Select new ones.")
      return;
    }
    setAddedExercises(selectedExercises.map((exercise) => exercise.name));
    console.log("Generated Exercises:", selectedExercises);
  };

  const handleSaveWorkout = async () => {
    const workoutName = (
      document.querySelector('input[type="text"]') as HTMLInputElement
    )?.value.trim();
    if (!workoutName) {
      alert("Please enter a workout name.");
      return;
    }

    const workoutExercises = addedExercises
      .map((exerciseName) => {
        const matchedExercise = exercises.find(
          (exercise) => exercise.name === exerciseName
        );
        return matchedExercise
          ? {
              name: exerciseName,
              muscleGroup: muscleGroups.includes(
                matchedExercise.muscleGroup as (typeof muscleGroups)[number]
              )
                ? matchedExercise.muscleGroup
                : "Other",
              equipment: equipmentOptions.includes(
                matchedExercise.equipment as (typeof equipmentOptions)[number]
              )
                ? matchedExercise.equipment
                : "None",
            }
          : undefined;
      })
      .filter(Boolean) as Exercise[];

    if (workoutExercises.length === 0) {
      alert("No valid exercises added.");
      return;
    }

    if (user?.sub) {
      const workout: Workout = {
        name: workoutName,
        exercises: workoutExercises,
        favorite: true,
        auth0id: user.sub,
      };
      try {
        await createWorkout(workout);
        alert("Workout saved successfully!");
        router.push("/home");
      } catch (error) {
        console.error("Error saving workout:", error);
        alert("Error saving your workout. Please try again.");
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
            <h2 className="text-white text-sm mb-1">Workout Name</h2>
            <input
              type="text"
              placeholder="Ex: Chest and Back Day"
              className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg"
            />

            <MuscleGroupSelector
              selectedMuscleGroups={selectedMuscleGroups}
              muscleGroups={muscleGroups}
              onSelect={(option) =>
                setSelectedMuscleGroups((prev) => [...prev, option])
              }
              onRemove={(option) =>
                setSelectedMuscleGroups((prev) =>
                  prev.filter((mg) => mg !== option)
                )
              }
            />

            <EquipmentSelector
              selectedEquipment={selectedEquipment}
              equipment={equipmentOptions}
              onSelect={(option) =>
                setSelectedEquipment((prev) => [...prev, option])
              }
              onRemove={(option) =>
                setSelectedEquipment((prev) =>
                  prev.filter((eq) => eq !== option)
                )
              }
            />
            <div className="flex items-center space-x-4 space-y-6">
              <button
                className="bg-purple font-bold text-white p-3 rounded-lg mt-6"
                onClick={() => handleGenerate()}
              >
                Generate Workout
              </button>
              <input
                type="number"
                min="0"
                placeholder="Number of Exercises"
                onChange={(e) => setNumExercises(Number(e.target.value))}
                className="text-white bg-darkPurple p-3 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple"
              />
            </div>
            <button
              onClick={handleSaveWorkout}
              className="bg-purple text-white py-2 px-4 rounded-lg mt-5"
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
    </div>
  );
}
export default withPageAuthRequired(Generate);
