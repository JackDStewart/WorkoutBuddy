import { ExerciseLog, Workout, ExerciseCardProps, SetLog } from "@/types";
import React, { useState } from "react";

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exerciseLog,
  onSetChange,
}) => {
  const [setList, setSetList] = useState<SetLog[]>(exerciseLog.sets);

  const addNewSet = () => {
    const newSet: SetLog = {
      weight: 0, // Default values for the new set
      reps: 0,
    };
    const updatedSetList = [...setList, newSet]; // Append new set to the list
    setSetList(updatedSetList); // Update local state
    onSetChange(updatedSetList); // Notify parent about the change
  };

  const delSet = (index: number) => {
    const updatedSetList = setList.filter((_, i) => index !== i);
    setSetList(updatedSetList);
    onSetChange(updatedSetList);
  };

  return (
    <div className="flex-shrink-0 flex-col bg-black text-gray-300 rounded-lg shadow-left-purple p-6 h-full">
      <h2 className="text-white text-xl font-bold mb-4">
        {exerciseLog.exercise.name}
      </h2>
      <h3
        className="text-gray-400 font-bold mb-4" /*call database for most recent weight*/
      >
        Last Weight: {"50lbs"}
      </h3>
      <ul className="space-y-2 text-gray-400 mb-4">
        {exerciseLog.sets.map((_, index) => (
          <li key={index}>
            <div className="flex space-x-4">
              <div className="mt-4 mb-2">Set: {index + 1}</div>
              <input
                type="text"
                className="text-white bg-darkPurple p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple mb-6 mt-2 w-16"
                value={exerciseLog.sets[index].weight} // Manage weight input
                onChange={(e) => {
                  const newWeight = Number(e.target.value);
                  const updatedSets = [...exerciseLog.sets];
                  updatedSets[index] = {
                    ...updatedSets[index],
                    weight: newWeight,
                  };
                  setSetList(updatedSets);
                  onSetChange(updatedSets);
                }}
              />
              <span className="mt-4 mb-2">lbs.</span>
              <input
                type="text"
                className="text-white bg-darkPurple p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple mb-6 mt-2 w-16"
                value={exerciseLog.sets[index].reps} // Manage reps input
                onChange={(e) => {
                  const newReps = Number(e.target.value);
                  const updatedSets = [...exerciseLog.sets];
                  updatedSets[index] = {
                    ...updatedSets[index],
                    reps: newReps,
                  };
                  setSetList(updatedSets);
                  onSetChange(updatedSets);
                }}
              />
              <span className="mt-4 mb-2">reps</span>

              {/* Push X button to the right */}
              <button
                className="ml-auto py-1 px-3 mb-4 mt-0 rounded-full hover:text-red-500 hover:bg-transparent"
                onClick={() => delSet(index)} // Add functionality to delete a set
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="footer flex relative justify-around mt-auto ">
        <button
          className="bg-purple text-xl font-semibold text-black py-1 px-3 rounded-full"
          onClick={addNewSet} //create new SetLog in the Exercise Log
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ExerciseCard;
