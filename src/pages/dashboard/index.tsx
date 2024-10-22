import React, { useState } from "react";
import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import { getWorkouts } from "../../mockRest";
import { DashboardProps } from "../../types";
import Modal from "@/components/Modal";

const Dashboard: React.FC<DashboardProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workouts = getWorkouts();
  const favWorkouts = workouts.filter((workout) => workout.isFavorite);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">My Workouts</h2>
          <button
            onClick={openModal}
            className="bg-purple text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {favWorkouts &&
            favWorkouts.map((workout) => (
              <WorkoutCard key={workout.name} workout={workout} />
            ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-full">
        <div className="max-h-[80vh] overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">My Workouts</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {workouts &&
              workouts.map((workout) => (
                <WorkoutCard key={workout.name} workout={workout} />
              ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
