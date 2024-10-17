import {Workout, Exercise} from '@/types'

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
