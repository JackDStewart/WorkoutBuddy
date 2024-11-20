import { Workout } from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAuth0 } from "@auth0/auth0-react";
import exp from "constants";

export async function createWorkout(workout: Workout) {
  console.log("here");

  const name = workout.name;
  const exercises = workout.exercises?.map((exercise) => ({
    name: exercise.name,
    equipment: exercise.equipment, // Ensure these fields match the backend ExerciseDTO
    muscleGroup: exercise.muscleGroup, // Ensure this is properly formatted
  }));
  const favorite = workout.favorite;
  const userAuth0Id = workout.auth0id;

  try {
    const response = await fetch("http://localhost:8080/workout/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        favorite,
        exercises,
        userAuth0Id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create workout: ${errorData.message || response.statusText}`
      );
    }

    const result = await response.json();
    console.log("Workout created:", result);
  } catch (error) {
    console.error("Error creating workout:", error);
  }
}

export async function fetchWorkouts(auth0Id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/workout/user/${auth0Id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch workouts");
    }
    const workouts = await response.json();
    console.log("Fetched workouts:", workouts);
    return workouts;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
}

export async function toggleFavoriteWorkout(workoutId: number) {
  try {
    const response = await fetch(
      `http://localhost:8080/workout/${workoutId}/toggleFavorite`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle favorite status");
    }

    const updatedWorkout = await response.json();
    return updatedWorkout;
  } catch (error) {
    console.error("Error toggling favorite status:", error);
  }
}

export async function fetchWorkoutByName(
  auth0Id: string,
  workoutName: string
): Promise<Workout | undefined> {
  const workouts: Workout[] = await fetchWorkouts(auth0Id);
  if (workouts.length > 0) {
    workouts.filter((workout) => {
      return workout.name === workoutName;
    });
    console.log("Workout not found");
    return;
  }
}

export async function fetchWorkoutById(
  workoutID: number
): Promise<Workout | undefined> {
  try {
    const response = await fetch(
      `http://localhost:8080/workout/id/${workoutID}`
    );
    if (!response.ok) {
      throw new Error("Failed to find workout ID");
    }
    const workouts = await response.json();
    console.log("Fetched workout by ID:", workouts);
    return workouts;
  } catch (error) {
    console.error("Error fetching workout by ID:", error);
    return;
  }
}

export async function deleteWorkout(workoutID: number): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:8080/workout/delete/${workoutID}`,
      {
        method: "DELETE", // Use DELETE method for deletion
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete workout");
    }

    console.log(`Workout with ID ${workoutID} has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting workout:", error);
  }
}

// export async function getNextWorkoutID(): Promise<number | undefined> {
//   try {
//     const response = await fetch(`http://localhost:8080/workout/id`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch workouts");
//     }
//     const nextID: number = await response.json();
//     console.log("Next Workout ID:", nextID);
//     return nextID;
//   } catch (error) {
//     console.error("Error fetching workouts:", error);
//     return;
//   }
// }
