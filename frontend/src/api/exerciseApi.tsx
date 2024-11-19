import { Exercise } from "@/types";

export async function fetchExercises() {
  try {
    const response = await fetch(`http://localhost:8080/exercises`);

    if (!response.ok) {
      throw new Error("Failed to fetch all exercises");
    }
    const exercises = await response.json();
    console.log("Fetched exercises:", exercises);
    return exercises;
  } catch (error) {
    console.error("Error fetching all exercises:", error);
    return [];
  }
}

export async function createExercise(
  exercise: Exercise
): Promise<Exercise | undefined> {
  try {
    const response = await fetch("http://localhost:8080/exercises/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to create exercise: ${errorData.message || response.statusText}`
      );
    }

    const result = await response.json();
    console.log("exercise created:", result);
    return result;
  } catch (error) {
    console.error("Error creating exercise:", error);
  }
}

export async function fetchExercisesWithCustoms(auth0Id: string) {
  console.log("Here");
  try {
    const baseUrl = "http://localhost:8080/exercises/by-user"; // Update the base URL if needed
    const url = auth0Id ? `${baseUrl}?userId=${auth0Id}` : baseUrl;
    const response = await fetch(url);
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
