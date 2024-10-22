import { Workout } from "@/types";
import React from "react";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  let exercises = workout.exercises;
  return (
    <div className="flex flex-col bg-black text-gray-300 rounded-lg shadow-left-purple p-4 md:p-6 lg:p-8 h-full max-w-full md:max-w-md lg:max-w-lg">
      <h2 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-4">
        {workout.name}
      </h2>
      <ul className="space-y-1 md:space-y-2 text-gray-400 mb-2 md:mb-4">
        {exercises.slice(0, 4).map((exercise, index) => (
          <li key={index}>
            {exercise.name}
            {index === 3 && exercises.length > 4 && "..."}
          </li>
        ))}
      </ul>
      <div className="footer flex justify-between w-full mt-auto h-10 space-x-2 overflow-hidden">
        <button className="bg-purple text-xs sm:text-sm md:text-base text-black h-full px-2 sm:px-3 md:px-4 lg:px-6 rounded-full flex-1 min-w-0">
          Start
        </button>
        <button className="bg-purple text-xs sm:text-sm md:text-base text-black h-full px-2 sm:px-3 md:px-4 lg:px-6 rounded-full flex-1 min-w-0">
          Expand
        </button>
        <button className="bg-purple text-xs sm:text-sm md:text-base text-black h-full px-2 sm:px-3 md:px-4 lg:px-6 rounded-full flex-1 min-w-0">
          Edit
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
