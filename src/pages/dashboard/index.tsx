import React from "react";
import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";

const Dashboard = () => {
  return (
    <div>
      <div className="relative">
        <h1 className="code-font text-4xl mt-10">Hello, user</h1>
        <Link
          href="/"
          passHref
          className="absolute top-0 right-0 bg-purple hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </Link>
      </div>

      <div className="relative bg-darkPurple top-10 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Workouts</h2>
          <button className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <WorkoutCard name="Workout A" />
          <WorkoutCard name="Workout B" />
          <WorkoutCard name="Workout C" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
