import { ExerciseLog, Exercise } from "@/types";

export async function saveExerciseLogs(exerciseLogs: ExerciseLog[]) {
  console.log("exercise logs: ", exerciseLogs);

  try {
    const response = await fetch("http://localhost:8080/log/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exerciseLogs),
    });

    if (!response.ok) {
      throw new Error(`Failed to save exercise logs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Exercise logs saved successfully:", data);
    return data; // Handle the response as needed
  } catch (error) {
    console.error("Error saving exercise logs:", error);
  }
}

export async function fetchExercisesUserHasDone(auth0Id: string) {
  try {
    const response = await fetch(
      `http://localhost:8080/log/exercises/user/${auth0Id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exercises");
    }
    const exercises = await response.json();
    console.log("Fetched exercises:", exercises);
    return exercises;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    return [];
  }
}

export async function fetchExerciseLogs(auth0Id: string, exercise: Exercise) {
  try {
    const response = await fetch(
      `http://localhost:8080/log/exercise-logs/${exercise.name}/user/${auth0Id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch exercise logs");
    }
    const exerciseLogs = await response.json();
    console.log("Fetched exercise logs:", exerciseLogs);
    return exerciseLogs;
  } catch (error) {
    console.error("Error fetching exercise logs:", error);
    return [];
  }
}
