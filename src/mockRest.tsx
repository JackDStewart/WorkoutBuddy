type Exercise = {
  name: string;
};

type Workout = {
  name: string;
  exercises: Exercise[];
};

export const getWorkouts = (): Workout[] => {
  return [
    {
      name: "Full Body Workout",
      exercises: [{ name: "Push-up" }, { name: "Squat" }, { name: "Plank" }],
    },
    {
      name: "Push A",
      exercises: [{ name: "Bench press" }, { name: "Shoulder press" }, { name: "Push-ups" }],
    },
  ];
};
