import React from "react";
import { AddedExerciseProps } from "../types";

const AddedExercise: React.FC<AddedExerciseProps> = ({
  exercises,
  addedList,
  setter,
}) => {
  const handleExerciseRemove = (exercise: string) => {
    // Remove the option from the selected muscleGroups list
    setter(addedList.filter((selected) => selected !== exercise));
  };
  return (
    <div className="pt-5">
      <ul className="grid w-full gap-6 md:grid-cols-2">
        {exercises?.map((data) => (
          <div
            key={data}
            className="inline-flex items-center w-full p-3 border border-purple rounded-lg"
          >
            <span className="w-full text-lg font-semibold mr-2">{data}</span>
            <button
              className="text-2xl text-white hover:bg-transparent hover:text-purple hover:scale-125"
              onClick={() => handleExerciseRemove(data)}
            >
              &times;
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AddedExercise;
