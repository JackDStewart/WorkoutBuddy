import React from "react";
import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "../../mockRest";
import {DashboardProps} from '../../types'


const Dashboard: React.FC<DashboardProps> = ({ workouts }) => {

  return (
    <div>
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Workouts</h2>
          <button className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {workouts &&
            workouts.map((data) => (
              <WorkoutCard key={data.name} name={data.name} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
