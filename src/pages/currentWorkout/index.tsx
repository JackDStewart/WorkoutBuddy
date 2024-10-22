import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/Header";
import Modal from "@/components/Modal"; // need modal component for popup
import { SingleAutocomplete } from "@/components/Autocomplete";
import { Workout, SetLog, ExerciseLog, Exercise } from "@/types";
import ExerciseCard from "@/components/ExerciseCard";

const Current = (/*workout: Workout*/) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
  let cur: string | null = null;
  const handleChange = (newValue: string | null) => {
    cur = newValue;
  };

  const [exerciseList, setExerciseList] = useState<ExerciseLog[]>(
    workout.exercises.map((exercise) => ({
      exercise,
      sets: [],
      date: new Date(),
    }))
  );
  //let exerciseList = workout.exercises;

  const addNewExercise = (exerciseStr: string | null) => {
    if (exerciseStr === null) {
      return;
    }
    //search database for matching exercise name and use that as input to exerciseLog.exercise
    const newExercise: ExerciseLog = {
      exercise: { name: exerciseStr }, // Default values for the new set
      sets: [],
      date: new Date(),
    };
    setExerciseList((prev) => [...prev, newExercise]);
    closeModal();
  };

  const updateSets = (index: number, newSetLogs: SetLog[]) => {
    const updatedExerciseLogs = [...exerciseList];
    updatedExerciseLogs[index] = {
      ...updatedExerciseLogs[index],
      sets: newSetLogs,
    };
    setExerciseList(updatedExerciseLogs);
  };
  return (
    <div>
      <Header />
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl">{workout.name}</h2>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {exerciseList.map((exerciseLog, index) => (
            <ExerciseCard
              key={exerciseLog.exercise.name}
              exerciseLog={exerciseLog}
              onSetChange={(newSetLogs) => updateSets(index, newSetLogs)}
            />
          ))}
          <button
            className="bg-purple text-4xl font-medium place-self-center text-black py-4 px-6 rounded-full"
            onClick={() => openModal()} //modal pop-up
          >
            +
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <h2 className="text-xl font-bold mb-4">Add an Excersise:</h2>
          <SingleAutocomplete
            label="Exercise"
            data={["exercise1", "exercise2"]} //implement api call to get all exercises here
            onExerciseChange={handleChange}
          ></SingleAutocomplete>
          <br />
          <div className="flex justify-center">
            <button
              className="bg-purple text-lg font-medium text-black py-2 px-4 rounded-full w-1/2"
              onClick={() => addNewExercise(cur)}
            >
              Add Exercise
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Current;
