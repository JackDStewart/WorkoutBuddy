import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { getWorkouts } from "@/mockRest";
import {
  SingleAutocomplete,
  MultipleAutocomplete,
} from "@/components/Autocomplete";

const Progress = () => {
  const workouts = getWorkouts();
  const exercises = workouts.flatMap((workout) =>
    workout.exercises.map((exercise) => exercise.name)
  );

  return (
    <div>
      <Header></Header>
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <label className="text-white text-2xl mb-6">Workout Name</label>
        <SingleAutocomplete
          label="Exercise"
          data={exercises}
          width={500}
        ></SingleAutocomplete>
        <MultipleAutocomplete
          label="Exercise"
          data={exercises}
          width={500}
        ></MultipleAutocomplete>
      </div>
    </div>
  );
};

export default Progress;
