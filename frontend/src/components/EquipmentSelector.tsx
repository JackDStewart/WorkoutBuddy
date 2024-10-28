import React from "react";

interface EquipmentSelectorProps {
  selectedEquipment: string[];
  equipment: string[];
  onSelect: (option: string) => void;
  onRemove: (option: string) => void;
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({
  selectedEquipment,
  equipment,
  onSelect,
  onRemove,
}) => (
  <div>
    <label className="block text-white text-sm mb-1 mt-8">
      Filter Exercises By Equipment
    </label>
    <div className="flex flex-wrap bg-darkPurple p-2 border border-white rounded-lg mb-4">
      <div className="flex flex-wrap">
        {selectedEquipment.map((option) => (
          <div
            key={option}
            className="flex items-center text-white rounded-full px-3 py-1 mr-2 mb-1 mt-1 border"
          >
            <span className="mr-2">{option}</span>
            <button
              className="text-white hover:bg-transparent hover:text-purple hover:scale-125"
              onClick={() => onRemove(option)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {selectedEquipment.length === 0 && (
        <input
          type="text"
          placeholder="Select Equipment Below"
          className="bg-transparent outline-none flex-grow text-white"
          readOnly
        />
      )}
    </div>
    <div className="mt-4">
      {equipment
        .filter((option) => !selectedEquipment.includes(option))
        .map((option) => (
          <button
            key={option}
            className="bg-darkPurple text-white rounded-full px-4 py-2 mr-2 mb-2 hover:bg-white hover:text-black transition border"
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
    </div>
  </div>
);

export default EquipmentSelector;
