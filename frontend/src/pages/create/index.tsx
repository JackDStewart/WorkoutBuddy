import React, { useState } from "react";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { SingleAutocomplete } from "@/components/Autocomplete";
import AddedExercise from "@/components/AddedExercise";
import { getWorkouts } from "../../mockRest";
import MuscleGroupSelector from "@/components/MuscleGroupSelector";
import EquipmentSelector from "@/components/EquipmentSelector";

const Create = () => {
  const [muscleGroups] = useState<string[]>([
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Quads",
    "Hamstrings",
    "Calves",
    "Cardio",
  ]);
  const [equipment] = useState<string[]>(["Barbell", "Dumbells", "Machine"]);
  const [addedExercises, setAddedExercises] = useState<string[]>([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>(
    []
  );
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState<string>("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const workouts = getWorkouts();
  let exerciseNames = workouts.flatMap((workout) =>
    workout.exercises.map((exercise) => exercise.name)
  );
  exerciseNames = Array.from(new Set(exerciseNames));

  const handleMuscleSelectOption = (option: string) => {
    if (!selectedMuscleGroups.includes(option)) {
      setSelectedMuscleGroups([...selectedMuscleGroups, option]);
    }
  };

  const handleMuscleRemoveOption = (option: string) => {
    setSelectedMuscleGroups(
      selectedMuscleGroups.filter((selected) => selected !== option)
    );
  };

  const handleEquipmentSelectOption = (option: string) => {
    if (!selectedEquipment.includes(option)) {
      setSelectedEquipment([...selectedEquipment, option]);
    }
  };

  const handleEquipmentRemoveOption = (option: string) => {
    setSelectedEquipment(
      selectedEquipment.filter((selected) => selected !== option)
    );
  };

  const handleExerciseAdd = (exercise: string | null) => {
    if (exercise && !addedExercises.includes(exercise)) {
      setAddedExercises([...addedExercises, exercise]);
      console.log("Selected Exercises:", exercise);
    }
  };

  const [modalSelectedMuscleGroups, setModalSelectedMuscleGroups] = useState<
    string[]
  >([]);
  const [modalSelectedEquipment, setModalSelectedEquipment] = useState<
    string[]
  >([]);

  const handleModalMuscleSelectOption = (option: string) => {
    if (!modalSelectedMuscleGroups.includes(option)) {
      setModalSelectedMuscleGroups([...modalSelectedMuscleGroups, option]);
    }
  };

  const handleModalMuscleRemoveOption = (option: string) => {
    setModalSelectedMuscleGroups(
      modalSelectedMuscleGroups.filter((selected) => selected !== option)
    );
  };

  const handleModalEquipmentSelectOption = (option: string) => {
    if (!modalSelectedEquipment.includes(option)) {
      setModalSelectedEquipment([...modalSelectedEquipment, option]);
    }
  };

  const handleModalEquipmentRemoveOption = (option: string) => {
    setModalSelectedEquipment(
      modalSelectedEquipment.filter((selected) => selected !== option)
    );
  };

  const handleSaveExercise = () => {
    const selectedMuscleGroups = modalSelectedMuscleGroups;
    const selectedEquipment = modalSelectedEquipment;

    if (!customExerciseName.trim()) {
      alert("Please enter an exercise name.");
      return;
    }

    const customExercise = {
      name: customExerciseName,
      muscleGroups: selectedMuscleGroups,
      equipment: selectedEquipment,
    };

    setAddedExercises([...addedExercises, customExerciseName]);
    console.log("Saved Custom Exercise:", customExercise);

    // make an API call here to save the exercise

    closeModal();
  };

  return (
    <div>
      <Header />
      <div className="relative bg-darkPurple top-5 rounded-lg p-6 ml-20 mr-20">
        <div className="flex">
          <div className="w-1/2 p-4">
            <label className="block text-white text-sm mb-1">
              Workout Name
            </label>
            <input
              type="text"
              placeholder="Ex: Chest and Back Day"
              className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple"
            />

            <MuscleGroupSelector
              selectedMuscleGroups={selectedMuscleGroups}
              muscleGroups={muscleGroups}
              onSelect={handleMuscleSelectOption}
              onRemove={handleMuscleRemoveOption}
            />

            <EquipmentSelector
              selectedEquipment={selectedEquipment}
              equipment={equipment}
              onSelect={handleEquipmentSelectOption}
              onRemove={handleEquipmentRemoveOption}
            />

            <label className="block text-white text-sm mb-1 mt-8">
              Search and Add Exercises
            </label>
            <div className="w-full">
              <SingleAutocomplete
                label="Exercise"
                data={exerciseNames.filter(
                  (exerciseName) => !addedExercises.includes(exerciseName)
                )}
                onExerciseChange={handleExerciseAdd}
              />
            </div>
            <button
              onClick={openModal}
              className="flex items-center text-white rounded-full px-3 py-1 mr-2 mb-1 mt-1 border hover:text-black hover:bg-white mt-10"
            >
              Create Custom Exercise
            </button>
          </div>
          <div className="w-1/2 p-4 ml-auto">
            <h2 className="font-bold text-2xl border-b-2">Added Exercises</h2>
            <AddedExercise
              exercises={addedExercises}
              addedList={addedExercises}
              setter={setAddedExercises}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} width="w-[400px]">
        <div>
          <h2 className="font-bold text-xl mb-4">Create Custom Exercise</h2>
          <label className="block text-white text-sm mb-1">Exercise Name</label>
          <input
            type="text"
            placeholder="Ex: Oscillating Owens"
            className="text-white bg-darkPurple w-full p-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:border-transparent focus:ring-purple"
            value={customExerciseName}
            onChange={(e) => setCustomExerciseName(e.target.value)}
          />

          {/* Independent MuscleGroupSelector for the modal */}
          <MuscleGroupSelector
            selectedMuscleGroups={modalSelectedMuscleGroups}
            muscleGroups={muscleGroups} // Use the same muscle groups array
            onSelect={handleModalMuscleSelectOption}
            onRemove={handleModalMuscleRemoveOption}
          />

          {/* Independent EquipmentSelector for the modal */}
          <EquipmentSelector
            selectedEquipment={modalSelectedEquipment}
            equipment={equipment} // Use the same equipment array
            onSelect={handleModalEquipmentSelectOption}
            onRemove={handleModalEquipmentRemoveOption}
          />

          {/* Additional modal content goes here */}
          <button
            onClick={handleSaveExercise}
            className="bg-purple hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-transitionPurple mt-5"
          >
            Save Exercise
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Create;
