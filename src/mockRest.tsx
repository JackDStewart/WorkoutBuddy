import { Workout, Exercise, ExerciseLog } from "@/types";

export const getWorkouts = (): Workout[] => {
  return workouts;
};

const workouts: Workout[] = [
  {
    name: "Full Body Workout",
    exercises: [
      { name: "Push-ups" },
      { name: "Squat" },
      { name: "Plank" },
      { name: "Lat Pulldown" },
      { name: "Bicep Curls" },
    ],
    isFavorite: true,
  },
  {
    name: "Push A",
    exercises: [
      { name: "Bench Press" },
      { name: "Shoulder Press" },
      { name: "Push-ups" },
    ],
    isFavorite: true,
  },
  {
    name: "Pull A",
    exercises: [
      { name: "Dumbbell Rows" },
      { name: "Pull Ups" },
      { name: "Bicep Curls" },
      { name: "Hammer Curls" },
      { name: "Lat Pulldowns" },
    ],
    isFavorite: false,
  },
  {
    name: "Pull B",
    exercises: [
      { name: "Barbell Rows" },
      { name: "Pull Ups" },
      { name: "Bicep Curls" },
      { name: "Hammer Curls" },
      { name: "Lat Pulldowns" },
    ],
    isFavorite: false,
  },
  {
    name: "Legs",
    exercises: [
      { name: "Squats" },
      { name: "Lunges" },
      { name: "Leg Press" },
      { name: "Calf Raises" },
      { name: "Deadlifts" },
    ],
    isFavorite: false,
  },
  {
    name: "Full Body",
    exercises: [
      { name: "Burpees" },
      { name: "Kettlebell Swings" },
      { name: "Push-ups" },
      { name: "Mountain Climbers" },
      { name: "Plank" },
    ],
    isFavorite: false,
  },
  {
    name: "Cardio Blast",
    exercises: [
      { name: "Running" },
      { name: "Cycling" },
      { name: "Jump Rope" },
      { name: "Rowing Machine" },
      { name: "Box Jumps" },
    ],
    isFavorite: true,
  },
  {
    name: "Core Workout",
    exercises: [
      { name: "Crunches" },
      { name: "Russian Twists" },
      { name: "Plank" },
      { name: "Leg Raises" },
      { name: "Bicycle Crunches" },
    ],
    isFavorite: false,
  },
  {
    name: "Yoga Flow",
    exercises: [
      { name: "Downward Dog" },
      { name: "Warrior II" },
      { name: "Child's Pose" },
      { name: "Tree Pose" },
      { name: "Cobra Pose" },
    ],
    isFavorite: true,
  },
  {
    name: "HIIT Circuit",
    exercises: [
      { name: "High Knees" },
      { name: "Burpees" },
      { name: "Squat Jumps" },
      { name: "Jumping Jacks" },
      { name: "Plank Jacks" },
    ],
    isFavorite: false,
  },
  {
    name: "Strength Training",
    exercises: [
      { name: "Squats" },
      { name: "Deadlifts" },
      { name: "Bench Press" },
      { name: "Pull-Ups" },
      { name: "Overhead Press" },
    ],
    isFavorite: true,
  },
  {
    name: "Upper Body",
    exercises: [
      { name: "Push-ups" },
      { name: "Tricep Extensions" },
      { name: "Chest Fly" },
      { name: "Dumbbell Rows" },
      { name: "Front Raises" },
    ],
    isFavorite: false,
  },
  {
    name: "Lower Body",
    exercises: [
      { name: "Leg Extensions" },
      { name: "Leg Curls" },
      { name: "Glute Bridges" },
      { name: "Hip Thrusts" },
      { name: "Side Lunges" },
    ],
    isFavorite: true,
  },
];

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

export const toggleFavoriteWorkout = (workoutName: string): void => {
  const workout = workouts.find((w) => w.name === workoutName);
  if (workout) {
    workout.isFavorite = !workout.isFavorite;
  } else {
    console.log(`Workout with name "${workoutName}" not found.`);
  }
};
