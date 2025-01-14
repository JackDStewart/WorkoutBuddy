import React, { useState, useEffect } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import {
  fetchWorkouts,
  toggleFavoriteWorkout,
  deleteWorkout,
} from "@/api/workoutApi";
import { DashboardProps, Workout } from "../../types";
import Modal from "@/components/Modal";

const Dashboard: React.FC<DashboardProps> = ({ id }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getWorkouts = async () => {
    if (id) {
      const fetchedWorkouts: Workout[] = await fetchWorkouts(id);
      setWorkouts(fetchedWorkouts);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, [id]);

  const handleUpdateFavorite = async (workoutId: number) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((workout) =>
        workout.id === workoutId
          ? { ...workout, favorite: !workout.favorite }
          : workout
      )
    );

    // Call the API and handle any errors
    try {
      await toggleFavoriteWorkout(workoutId);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      // Revert UI update if API call fails
      setWorkouts((prevWorkouts) =>
        prevWorkouts.map((workout) =>
          workout.id === workoutId
            ? { ...workout, favorite: !workout.favorite }
            : workout
        )
      );
    }
  };

  const handleDeleteWorkout = async (workoutId: number) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.filter((workout) => workout.id !== workoutId)
    );

    try {
      await deleteWorkout(workoutId);
    } catch (error) {
      console.error("Failed to delete workout:", error);
      getWorkouts();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const favWorkouts: Workout[] = workouts.filter((workout) => workout.favorite);

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
          {favWorkouts.length === 0 && (
            <div className="flex col-span-3 items-center justify-center h-32">
              <p className="text-lg text-center">
                Favorite a Workout to see it here!
              </p>
            </div>
          )}
          {favWorkouts?.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onUpdateFavorite={handleUpdateFavorite}
              onDeleteWorkout={handleDeleteWorkout}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-full">
        <div className="max-h-[80vh] overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-4">My Workouts</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {workouts.length === 0 && (
              <div className="flex col-span-3 items-center justify-center h-32">
                <p className="text-lg text-center">
                  Complete a Workout to save it!
                </p>
              </div>
            )}
            {workouts?.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onUpdateFavorite={handleUpdateFavorite}
                onDeleteWorkout={handleDeleteWorkout}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
