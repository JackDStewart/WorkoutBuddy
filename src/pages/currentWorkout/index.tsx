import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import { Workout, SetLog, ExerciseLog } from "@/types";
import ExerciseCard from "@/components/ExerciseCard";

const Current = (/*workout: Workout*/) => {
  const router = useRouter();
  //let { workout } = router.query; // Get the selected workout from query parameters

  let workout: Workout = {
    name: "Full Body Workout",
    exercises: [
      { name: "Push-up" },
      { name: "Squat" },
      { name: "Plank" },
      { name: "Lat Pulldown" },
      { name: "Bicep Curls" },
    ],
  };
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>(
    workout.exercises.map((exercise) => ({ exercise, sets: [] }))
  );

  const updateSets = (index: number, newSetLogs: SetLog[]) => {
    const updatedExerciseLogs = [...exerciseLogs];
    updatedExerciseLogs[index] = {
      ...updatedExerciseLogs[index],
      sets: newSetLogs,
    };
    setExerciseLogs(updatedExerciseLogs);
  };
  return (
    <div>
      <Header />
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">{workout.name}</h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {exerciseLogs.map((exerciseLog, index) => (
            <ExerciseCard
              key={exerciseLog.exercise.name}
              exerciseLog={exerciseLog}
              onSetChange={(newSetLogs) => updateSets(index, newSetLogs)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Current;
