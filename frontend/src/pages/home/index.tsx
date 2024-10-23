import React, { useState } from "react";
import "../../app/globals.css";
import Dashboard from "../dashboard";
import Header from "@/components/Header";
import Link from "next/link";
import Modal from "@/components/Modal";
import { getWorkouts } from "../../mockRest";
import Radio from "@/components/Radio";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const workouts = getWorkouts();
  const workoutNames = workouts.map((workout) => workout.name);
  workoutNames.push("Start a new workout");
  /*workouts.push({
    name: "Start a new workout",
    exercises: [],
  });*/

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header></Header>
      <Dashboard workouts={workouts}></Dashboard>
      <button
        onClick={openModal}
        className="fixed bottom-5 right-6 flex justify-center items-center
        w-[180px] p-2 rounded-full text-l bg-purple border-none transition-transform
        duration-500 hover:bg-transitionPurple hover:scale-125"
      >
        Start Workout
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-[400px]">
        <div className="max-h-[80vh] overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">Start Workout</h2>
          <p>Choose Workout</p>
          <Radio workouts={workoutNames}></Radio>
        </div>
      </Modal>
    </div>
  );
}
