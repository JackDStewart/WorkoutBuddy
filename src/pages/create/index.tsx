import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

const Create = () => {
  const [options] = useState([
    "Chest", "Back", "Shoulders", "Biceps", "Triceps",
    "Quads", "Hamstrings", "Calves", "Cardio"
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectOption = (option) => {
    // Add the option to the selected options list if it's not already there
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleRemoveOption = (option) => {
    // Remove the option from the selected options list
    setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
  };

  return (
    <div>
      <Header/>
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex">
          <div className="w-1/2 p-4">
            <label className="block text-white text-sm mb-2">
              Workout Name
            </label>
            <input
              type="text"
              placeholder="Ex: Chest and Back Day"
              className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple mb-6"
            />

            {/* Muscle Groups */}
            <label className="block text-white text-sm mb-2">
              Muscle Groups
            </label>

            {/* Input container with selected options inside */}
            <div className="flex flex-wrap bg-darkPurple p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple mb-4">
              
              {/* Render selected options as bubbles */}
              <div className="flex flex-wrap">
                {selectedOptions.map((option) => (
                  <div
                    key={option}
                    className="flex items-center text-white rounded-full px-3 py-1 mr-2 mb-1 mt-1 border"
                  >
                    <span className="mr-2">{option}</span>
                    <button
                      className="text-white hover:bg-transparent hover:text-purple"
                      onClick={() => handleRemoveOption(option)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>

              {/* Conditional Placeholder */}
              {selectedOptions.length === 0 && (
                <input
                  type="text"
                  placeholder="Select Muscle Groups Below"
                  className="bg-transparent outline-none flex-grow text-white"
                  readOnly
                />
              )}
            </div>

            {/* Dropdown or list of options */}
            <div className="mt-4">
              {options
                .filter(option => !selectedOptions.includes(option)) // Filter out selected options
                .map((option) => (
                  <button
                    key={option}
                    className="bg-darkPurple text-white rounded-full px-4 py-2 mr-2 mb-2 hover:bg-white hover:text-black transition border"
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
                  </button>
              ))}
            </div>
            <button className="bg-purple font-bold text-white p-3 rounded-lg mt-4">
              Add Exercises
            </button>
          </div>

          {/* Right Column for Added Exercises */}
          <div className="w-1/2 p-4">
            <h2 className="font-bold text-2xl border-b-2">Added Exercises</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
