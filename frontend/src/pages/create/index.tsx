import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SingleAutocomplete } from "@/components/Autocomplete";
import AddedExercise from "@/components/AddedExercise";
import MuscleGroupSelector from "@/components/MuscleGroupSelector";
import EquipmentSelector from "@/components/EquipmentSelector";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import ProfileClient from "@/components/ProfileClient";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { fetchExercises, fetchExercisesWithCustoms } from "@/api/exerciseApi";
import { createWorkout } from "@/api/workoutApi";
import { Exercise, Workout } from "@/types";
import { createExercise } from "@/api/exerciseApi";

function Create() {
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

  // State
  const [addedExercises, setAddedExercises] = useState<string[]>([]); // Specify the type here
  const [exercises, setExercises] = useState<Exercise[]>([]); // Specify the type here
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
    []
  );
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customExerciseName, setCustomExerciseName] = useState<string>("");

  useEffect(() => {
    const getExercises = async () => {
      if (user?.sub) {
        console.log(user);
        const fetchedExercises = await fetchExercisesWithCustoms(
          user.sub.substring(14)
        );
        setExercises(fetchedExercises);
      }
    };

    if (user) {
      getExercises();
    }
  }, [user]);

  useEffect(() => {
    const filterExercises = () => {
      if (selectedMuscleGroups.length === 0 && selectedEquipment.length === 0) {
        setFilteredExercises(exercises);
      } else {
        const filtered = exercises.filter((exercise) => {
          const matchesMuscleGroup =
            selectedMuscleGroups.length === 0 ||
            selectedMuscleGroups.includes(
              formatToTitleCase(exercise.muscleGroup)
            );
          const matchesEquipment =
            selectedEquipment.length === 0 ||
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
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAddExercise = (exercise: string | null) => {
    // Update the type here to match the SingleAutocomplete
    if (exercise && !addedExercises.includes(exercise)) {
      setAddedExercises([...addedExercises, exercise]);
    }
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

  const handleSaveExercise = async () => {
    if (!customExerciseName.trim()) {
      alert("Please enter an exercise name.");
      return;
    }

    if (user?.sub) {
      const newExercise: Exercise = {
        name: customExerciseName,
        muscleGroup:
          selectedMuscleGroups.length > 0 ? selectedMuscleGroups[0] : "Other",
        equipment: selectedEquipment.length > 0 ? selectedEquipment[0] : "None",
        userAuth0Id: user.sub,
      };

      try {
        const createdExercise = await createExercise(newExercise);

        // Validate `createdExercise` is defined before updating state
        if (createdExercise) {
          setExercises((prev) => [...prev, createdExercise]);
          setAddedExercises([...addedExercises, createdExercise.name]);
        }

        // Reset modal inputs
        setCustomExerciseName("");
        setSelectedMuscleGroups([]);
        setSelectedEquipment([]);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error creating exercise:", error);
        alert("Failed to create exercise. Please try again.");
      }
    } else {
      alert("You need to be logged in to create a custom exercise.");
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

            <h2 className="text-white text-sm mb-1 mt-8">
              Search and Add Exercises
            </h2>
            <SingleAutocomplete
              label="Exercise"
              data={filteredExercises
                .map((exercise) => exercise.name)
                .filter((name) => !addedExercises.includes(name))}
              onExerciseChange={handleAddExercise}
            />

            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white px-3 py-2 mt-10 border rounded-lg"
            >
              Create Custom Exercise
            </button>
            <button
              onClick={handleSaveWorkout}
              className="bg-purple text-white py-2 px-4 rounded-lg mt-5 ml-4"
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
        width="w-[700px]"
      >
        <div className="max-h-[75vh] overflow-y-auto p-4">
          <h2 className="font-bold text-xl mb-4">Create Custom Exercise</h2>
          <input
            type="text"
            placeholder="Ex: Oscillating Owens"
            className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg"
            value={customExerciseName}
            onChange={(e) => setCustomExerciseName(e.target.value)}
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
              setSelectedEquipment((prev) => prev.filter((eq) => eq !== option))
            }
          />

          <button
            onClick={handleSaveExercise}
            className="bg-purple text-white py-2 px-4 rounded-lg mt-5"
          >
            Save Exercise
          </button>
        </div>
      </Modal>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
export default Create;
