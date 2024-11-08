import React, { useState } from "react";
import "../../app/globals.css";
import Dashboard from "../dashboard";
import Header from "@/components/Header";
import Link from "next/link";
import Modal from "@/components/Modal";
import { getWorkouts } from "../../mockRest";
import Radio from "@/components/Radio";
import { useUser } from '@auth0/nextjs-auth0/client';
import ProfileClient from "@/components/ProfileClient";


export default function HomePage() {

  const fetchWorkoutLogs = async () => {
    fetch("http://localhost:8080/demo/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Ensure you parse the response as JSON
      })
      .then((data) => {
        console.log(data); // This should log { message: "Hello from the backend!" }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  //fetchWorkoutLogs();

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
      <ProfileClient></ProfileClient>
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
