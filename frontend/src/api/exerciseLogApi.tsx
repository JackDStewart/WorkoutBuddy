import {ExerciseLog} from '@/types';

export async function saveExerciseLogs(exerciseLogs: ExerciseLog[]) {
    
    console.log("exercise logs: ", exerciseLogs)
  
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
