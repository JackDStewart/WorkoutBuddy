import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import Dashboard from "../dashboard";
import Header from "@/components/Header";
import Link from "next/link";
import Modal from "@/components/Modal";
import Radio from "@/components/Radio";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileClient from "@/components/ProfileClient";
import { syncUser } from "@/api/userApi";
import { createWorkout, fetchWorkouts } from "@/api/workoutApi";
import { Workout } from "@/types";

export default function HomePage() {
  const { user, isLoading } = useUser();
  const [workouts, setWorkouts] = useState<Workout[]>([]); // State to store workouts
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      syncUser(user).catch(console.error);
    }
  }, [isLoading, user]);

  // Fetch workouts and store in state
  const getWorkoutsList = async () => {
    if (user?.sub) {
      const fetchedWorkouts = await fetchWorkouts(user.sub.substring(14)); // Assuming `fetchWorkouts` fetches the workouts correctly
      setWorkouts(fetchedWorkouts); // Store fetched workouts in state
    }
  };

  // Create a new workout
  const create = async () => {
    if (user?.sub) {
      const workout: Workout = {
        name: "Full Body Workout",
        exercises: [
          {
            name: "Push-ups",
            equipment: "None",
            muscleGroup: "Chest",
          },
        ],
        favorite: true,
        auth0id: user?.sub
      };
      await createWorkout(workout); // Assuming this function creates a workout
    }
  };

  // Run the getWorkoutsList when the component is mounted or user changes
  useEffect(() => {
    getWorkoutsList();
  }, [user]);

  const workoutNames = workouts.map((workout) => workout.name);
  workoutNames.push("Start a new workout");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <Header />
      <ProfileClient />
      
      {user && user.sub && <Dashboard id={user.sub.substring(14)} workouts={workouts} />}
      <button
        onClick={openModal}
        className="fixed bottom-5 right-6 flex justify-center items-center w-[180px] p-2 rounded-full text-l bg-purple border-none transition-transform duration-500 hover:bg-transitionPurple hover:scale-125"
      >
        Start Workout
      </button>

      <button onClick={create}>Create</button>

      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-[400px]">
        <div className="max-h-[80vh] overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">Start Workout</h2>
          <p>Choose Workout</p>
          <Radio workouts={workoutNames} />
        </div>
      </Modal>
    </div>
  );
}
