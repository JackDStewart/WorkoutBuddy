export async function fetchExercises() {
    try {
      const response = await fetch(
        `http://localhost:8080/exercises`
      );
  
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
  