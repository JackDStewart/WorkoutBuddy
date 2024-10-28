import React, { useState } from "react";
import { Exercise } from "../../types";
import Link from "next/link";
import Header from "@/components/Header";

import { SingleAutocomplete } from "@/components/Autocomplete";

import AddedExercise from "@/components/AddedExercise";
import { getWorkouts } from "../../mockRest";


const Generate = () => {
  const [muscleGroups] = useState<string[]>([
    "Chest", "Back", "Shoulders", "Biceps", "Triceps",
    "Quads", "Hamstrings", "Calves", "Cardio"
  ]);
  const [equipment] = useState<string[]>([
    "Barbell", "Dumbells", "Machine"
  ]);
  const [addedExercises, setAddedExercises] = useState<string[]>([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipement] = useState<string[]>([]);
  const [numExercises, setNumExercises] = useState<number>(6);
  
  const workouts = getWorkouts();
  // const workoutNames = workouts.map(workout => workout.name);
  let exerciseNames = workouts.flatMap((workout) =>
    workout.exercises.map((exercise) => exercise.name)
  );
  exerciseNames = Array.from(new Set(exerciseNames));

  //const exerciseNames = exercises.map((exercise) => exercise.name);
  
  const handleMuscleSelectOption = (option: string) => {
    // Add the option to the selected muscleGroups list if it's not already there
    if (!selectedMuscleGroups.includes(option)) {
      setSelectedMuscleGroups([...selectedMuscleGroups, option]);
    }
  };

  const handleMuscleRemoveOption = (option: string) => {
    // Remove the option from the selected muscleGroups list
    setSelectedMuscleGroups(selectedMuscleGroups.filter((selected) => selected !== option));
  };

  const handleEquipmentSelectOption = (option: string) => {
    // Add the option to the selected muscleGroups list if it's not already there
    if (!selectedEquipment.includes(option)) {
      setSelectedEquipement([...selectedEquipment, option]);
    }
  };

  const handleEquipmentRemoveOption = (option: string) => {
    // Remove the option from the selected muscleGroups list
    setSelectedEquipement(selectedEquipment.filter((selected) => selected !== option));
  };

  const getRandomUniqueSelections = (numSelections: number) => {
    const shuffled = [...exerciseNames].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSelections);
  };

  const handleGenerate = () => {
    const exercises = getRandomUniqueSelections(numExercises);
    setAddedExercises(exercises);
    console.log("Generated Exercises:", exercises);
  };

  return (
    <div>
      <Header/>
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex">
          <div className="w-1/2 p-4">
            <label className="block text-white text-sm mb-1">
              Workout Name
            </label>
            <input
              type="text"
              placeholder="Ex: Chest and Back Day"
              className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple"
            />

            {/* Muscle Groups */}
            <label className="block text-white text-sm mb-1 mt-8">
              Filter Exercises By Muscle Groups
            </label>

            {/* Input container with selected muscleGroups inside */}
            <div className="flex flex-wrap bg-darkPurple p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple mb-4">
              
              {/* Render selected muscleGroups as bubbles */}
              <div className="flex flex-wrap">
                {selectedMuscleGroups.map((option) => (
                  <div
                    key={option}
                    className="flex items-center text-white rounded-full px-3 py-1 mr-2 mb-1 mt-1 border"
                  >
                    <span className="mr-2">{option}</span>
                    <button
                      className="text-white hover:bg-transparent hover:text-purple hover:scale-125"
                      onClick={() => handleMuscleRemoveOption(option)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* Conditional Placeholder */}
              {selectedMuscleGroups.length === 0 && (
                <input
                  type="text"
                  placeholder="Select Muscle Groups Below"
                  className="bg-transparent outline-none flex-grow text-white"
                  readOnly
                />
              )}
            </div>

            {/* Dropdown or list of muscleGroups */}
            <div className="mt-4">
              {muscleGroups
                .filter(option => !selectedMuscleGroups.includes(option)) // Filter out selected muscleGroups
                .map((option) => (
                  <button
                    key={option}
                    className="bg-darkPurple text-white rounded-full px-4 py-2 mr-2 mb-2 hover:bg-white hover:text-black transition border"
                    onClick={() => handleMuscleSelectOption(option)}
                  >
                    {option}
                  </button>
              ))}
            </div>
            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            {/* Equipment */}
            <label className="block text-white text-sm mb-1 mt-8">
              Filter Exercises By Equipment
            </label>

            {/* Input container with selected muscleGroups inside */}
            <div className="flex flex-wrap bg-darkPurple p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple mb-4">
              
              {/* Render selected muscleGroups as bubbles */}
              <div className="flex flex-wrap">
                {selectedEquipment.map((option) => (
                  <div
                    key={option}
                    className="flex items-center text-white rounded-full px-3 py-1 mr-2 mb-1 mt-1 border"
                  >
                    <span className="mr-2">{option}</span>
                    <button
                      className="text-white hover:bg-transparent hover:text-purple hover:scale-125"
                      onClick={() => handleEquipmentRemoveOption(option)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* Conditional Placeholder */}
              {selectedEquipment.length === 0 && (
                <input
                  type="text"
                  placeholder="Select Equipment Below"
                  className="bg-transparent outline-none flex-grow text-white"
                  readOnly
                />
              )}
            </div>

            {/* Dropdown or list of equipment */}
            <div className="mt-4">
              {equipment
                .filter(option => !selectedEquipment.includes(option)) // Filter out selected equipment
                .map((option) => (
                  <button
                    key={option}
                    className="bg-darkPurple text-white rounded-full px-4 py-2 mr-2 mb-2 hover:bg-white hover:text-black transition border"
                    onClick={() => handleEquipmentSelectOption(option)}
                  >
                    {option}
                  </button>
              ))}
            </div>
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

          </div>
          {/* Right Column for Added Exercises */}
          <div className="w-1/2 p-4 ml-auto">
            <h2 className="font-bold text-2xl border-b-2">Added Exercises</h2>
            <AddedExercise exercises={addedExercises} addedList={addedExercises} setter={setAddedExercises}></AddedExercise>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
