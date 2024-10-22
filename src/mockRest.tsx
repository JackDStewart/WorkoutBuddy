import { Workout, Exercise, ExerciseLog } from "@/types";

export const getWorkouts = (): Workout[] => {
  return [
    {
      name: "Full Body Workout",
      exercises: [
        { name: "Push-up" },
        { name: "Squat" },
        { name: "Plank" },
        { name: "Lat Pulldown" },
        { name: "Bicep Curls" },
      ],
    },
    {
      name: "Push A",
      exercises: [
        { name: "Bench Press" },
        { name: "Shoulder Press" },
        { name: "Push-ups" },
      ],
    },
  ];
};

export const getExerciseLogs = (): ExerciseLog[] => {
  return [
    {
      exercise: { name: "Squat" },
      sets: [
        { weight: 100, reps: 10 },
        { weight: 105, reps: 8 },
        { weight: 110, reps: 6 },
      ],
      date: new Date("2024-01-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 100, reps: 10 },
        { weight: 105, reps: 8 },
        { weight: 110, reps: 6 },
      ],
      date: new Date("2024-01-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 115, reps: 8 },
        { weight: 120, reps: 7 },
        { weight: 125, reps: 6 },
      ],
      date: new Date("2024-02-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 130, reps: 8 },
        { weight: 135, reps: 5 },
        { weight: 140, reps: 6 },
      ],
      date: new Date("2024-03-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 145, reps: 7 },
        { weight: 150, reps: 5 },
        { weight: 155, reps: 6 },
      ],
      date: new Date("2024-04-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 160, reps: 8 },
        { weight: 165, reps: 5 },
        { weight: 170, reps: 4 },
      ],
      date: new Date("2024-05-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 175, reps: 5 },
        { weight: 180, reps: 6 },
        { weight: 185, reps: 4 },
      ],
      date: new Date("2024-06-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 190, reps: 6 },
        { weight: 195, reps: 4 },
        { weight: 200, reps: 5 },
      ],
      date: new Date("2024-07-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 205, reps: 6 },
        { weight: 210, reps: 4 },
        { weight: 215, reps: 5 },
      ],
      date: new Date("2024-08-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 220, reps: 6 },
        { weight: 225, reps: 5 },
        { weight: 230, reps: 4 },
      ],
      date: new Date("2024-09-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 235, reps: 6 },
        { weight: 240, reps: 5 },
        { weight: 245, reps: 4 },
      ],
      date: new Date("2024-10-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 250, reps: 6 },
        { weight: 255, reps: 5 },
        { weight: 260, reps: 4 },
      ],
      date: new Date("2024-11-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 265, reps: 6 },
        { weight: 270, reps: 5 },
        { weight: 275, reps: 4 },
      ],
      date: new Date("2024-12-01"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 265, reps: 6 },
        { weight: 270, reps: 5 },
        { weight: 300, reps: 4 },
      ],
      date: new Date("2024-12-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 50, reps: 6 },
        { weight: 50, reps: 5 },
        { weight: 55, reps: 4 },
      ],
      date: new Date("2023-01-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-02-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-03-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-04-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-05-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-06-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-07-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-07-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-09-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-10-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 70, reps: 4 },
      ],
      date: new Date("2023-11-02"),
    },
    {
      exercise: { name: "Bench Press" },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 75, reps: 4 },
      ],
      date: new Date("2023-12-02"),
    },
  ];
};
