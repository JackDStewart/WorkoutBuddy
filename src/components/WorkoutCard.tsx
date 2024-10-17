import { Workout } from "@/types";
import React from "react";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  let exercises = workout.exercises;
  return (
    <div className="flex flex-col bg-black text-gray-300 rounded-lg shadow-left-purple p-6 h-full">
      <h2 className="text-white text-xl font-bold mb-4">{workout.name}</h2>
      <ul className="space-y-2 text-gray-400 mb-4">
        {exercises.slice(0, 4).map((exercise, index) => (
          <li key={index}>
            {exercise.name}
            {index == 3 && exercises.length > 4 && "..."}
          </li>
        ))}
      </ul>
      <div className="footer flex relative justify-around mt-auto ">
        <button className="bg-purple text-sm text-black py-1 px-4 rounded-full">
          Start
        </button>
        <button className="bg-purple text-sm text-black py-1 px-4 rounded-full">
          Expand
        </button>
        <button className="bg-purple text-sm text-black py-2 px-4 rounded-full ">
          Edit
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
