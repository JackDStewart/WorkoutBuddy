import React from 'react';

interface WorkoutCardProps {
    name: string;
  }

const WorkoutCard: React.FC<WorkoutCardProps> = ({ name }) => {
  return (
    <div className="bg-black text-gray-300 rounded-lg shadow-lg p-6 w-">
      <h2 className="text-white text-xl font-bold mb-4">{name}</h2>
      <ul className="space-y-2 text-gray-400">
        <li>Barbell Squat</li>
        <li>Quad Extensions</li>
        <li>Standing Calf Machine</li>
        <li>Hamstring Curls...</li>
      </ul>
      <div className="flex justify-around mt-4">
        <button className="bg-purple text-sm text-black py-1 px-4 rounded-full hover:bg-darkPurple">
          Start
        </button>
        <button className="bg-purple text-sm text-black py-1 px-4 rounded-full hover:bg-purple">
          Expand
        </button>
        <button className="bg-purple text-sm text-black py-2 px-4 rounded-full hover:bg-purple">
          Edit
        </button>
      </div>
    </div>
  );
};

export default WorkoutCard;
