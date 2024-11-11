import { Workout, Exercise, ExerciseLog } from "@/types";

export const getWorkouts = (): Workout[] => {
  return workouts;
};

const workouts: Workout[] = [
  {
    name: "Full Body Workout",
    exercises: [
      {
        name: "Push-ups",
        equipment: "None",
        muscleGroup: "Chest",
      },
      {
        name: "Squat",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Plank",
        equipment: "None",
        muscleGroup: "Abs",
      },
      {
        name: "Lat Pulldown",
        equipment: "Machine",
        muscleGroup: "Lats",
      },
      {
        name: "Bicep Curls",
        equipment: "Dumbbell",
        muscleGroup: "Biceps",
      },
    ],
    favorite: true,
  },
  {
    name: "Push A",
    exercises: [
      {
        name: "Bench Press",
        equipment: "Barbell",
        muscleGroup: "Chest",
      },
      {
        name: "Shoulder Press",
        equipment: "Dumbbell",
        muscleGroup: "Shoulders",
      },
      {
        name: "Push-ups",
        equipment: "None",
        muscleGroup: "Chest",
      },
    ],
    favorite: true,
  },
  {
    name: "Pull A",
    exercises: [
      {
        name: "Dumbbell Rows",
        equipment: "Dumbbell",
        muscleGroup: "Back",
      },
      {
        name: "Pull Ups",
        equipment: "None",
        muscleGroup: "Lats",
      },
      {
        name: "Bicep Curls",
        equipment: "Dumbbell",
        muscleGroup: "Biceps",
      },
      {
        name: "Hammer Curls",
        equipment: "Dumbbell",
        muscleGroup: "Biceps",
      },
      {
        name: "Lat Pulldowns",
        equipment: "Machine",
        muscleGroup: "Lats",
      },
    ],
    favorite: false,
  },
  {
    name: "Pull B",
    exercises: [
      {
        name: "Barbell Rows",
        equipment: "Barbell",
        muscleGroup: "Back",
      },
      {
        name: "Pull Ups",
        equipment: "None",
        muscleGroup: "Lats",
      },
      {
        name: "Bicep Curls",
        equipment: "Dumbbell",
        muscleGroup: "Biceps",
      },
      {
        name: "Hammer Curls",
        equipment: "Dumbbell",
        muscleGroup: "Biceps",
      },
      {
        name: "Lat Pulldowns",
        equipment: "Machine",
        muscleGroup: "Lats",
      },
    ],
    favorite: false,
  },
  {
    name: "Quads",
    exercises: [
      {
        name: "Squats",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Lunges",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Leg Press",
        equipment: "Machine",
        muscleGroup: "Quads",
      },
      {
        name: "Calf Raises",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Deadlifts",
        equipment: "Barbell",
        muscleGroup: "Quads",
      },
    ],
    favorite: false,
  },
  {
    name: "Full Body",
    exercises: [
      {
        name: "Burpees",
        equipment: "None",
        muscleGroup: "Full Body",
      },
      {
        name: "Kettlebell Swings",
        equipment: "Kettlebell",
        muscleGroup: "Full Body",
      },
      {
        name: "Push-ups",
        equipment: "None",
        muscleGroup: "Chest",
      },
      {
        name: "Mountain Climbers",
        equipment: "None",
        muscleGroup: "Abs",
      },
      {
        name: "Plank",
        equipment: "None",
        muscleGroup: "Abs",
      },
    ],
    favorite: false,
  },
  {
    name: "Cardio Blast",
    exercises: [
      {
        name: "Running",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Cycling",
        equipment: "Machine",
        muscleGroup: "Quads",
      },
      {
        name: "Jump Rope",
        equipment: "None",
        muscleGroup: "Full Body",
      },
      {
        name: "Rowing Machine",
        equipment: "Machine",
        muscleGroup: "Back",
      },
      {
        name: "Box Jumps",
        equipment: "None",
        muscleGroup: "Quads",
      },
    ],
    favorite: true,
  },
  {
    name: "Abs Workout",
    exercises: [
      {
        name: "Crunches",
        equipment: "None",
        muscleGroup: "Abs",
      },
      {
        name: "Russian Twists",
        equipment: "None",
        muscleGroup: "Abs",
      },
      {
        name: "Plank",
        equipment: "None",
        muscleGroup: "Abs",
      },
      {
        name: "Leg Raises",
        equipment: "None",
        muscleGroup: "Abs",
      },
      {
        name: "Bicycle Crunches",
        equipment: "None",
        muscleGroup: "Abs",
      },
    ],
    favorite: false,
  },
  {
    name: "Yoga Flow",
    exercises: [
      {
        name: "Downward Dog",
        equipment: "None",
        muscleGroup: "Full Body",
      },
      {
        name: "Warrior II",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Child's Pose",
        equipment: "None",
        muscleGroup: "Full Body",
      },
      {
        name: "Tree Pose",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Cobra Pose",
        equipment: "None",
        muscleGroup: "Back",
      },
    ],
    favorite: true,
  },
  {
    name: "HIIT Circuit",
    exercises: [
      {
        name: "High Knees",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Burpees",
        equipment: "None",
        muscleGroup: "Full Body",
      },
      {
        name: "Squat Jumps",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Jumping Jacks",
        equipment: "None",
        muscleGroup: "Full Body",
      },
      {
        name: "Plank Jacks",
        equipment: "None",
        muscleGroup: "Abs",
      },
    ],
    favorite: false,
  },
  {
    name: "Strength Training",
    exercises: [
      {
        name: "Squats",
        equipment: "None",
        muscleGroup: "Quads",
      },
      {
        name: "Deadlifts",
        equipment: "Barbell",
        muscleGroup: "Quads",
      },
      {
        name: "Bench Press",
        equipment: "Barbell",
        muscleGroup: "Chest",
      },
      {
        name: "Pull-Ups",
        equipment: "None",
        muscleGroup: "Back",
      },
      {
        name: "Overhead Press",
        equipment: "Dumbbell",
        muscleGroup: "Shoulders",
      },
    ],
    favorite: true,
  },
];

export const getExerciseLogs = (): ExerciseLog[] => {
  return [
    {
      exercise: {
        name: "Squat",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 100, reps: 10 },
        { weight: 105, reps: 8 },
        { weight: 110, reps: 6 },
      ],
      date: new Date("2024-01-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 100, reps: 10 },
        { weight: 105, reps: 8 },
        { weight: 110, reps: 6 },
      ],
      date: new Date("2024-01-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 115, reps: 8 },
        { weight: 120, reps: 7 },
        { weight: 125, reps: 6 },
      ],
      date: new Date("2024-02-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 130, reps: 8 },
        { weight: 135, reps: 5 },
        { weight: 140, reps: 6 },
      ],
      date: new Date("2024-03-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 145, reps: 7 },
        { weight: 150, reps: 5 },
        { weight: 155, reps: 6 },
      ],
      date: new Date("2024-04-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 160, reps: 8 },
        { weight: 165, reps: 5 },
        { weight: 170, reps: 4 },
      ],
      date: new Date("2024-05-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 175, reps: 5 },
        { weight: 180, reps: 6 },
        { weight: 185, reps: 4 },
      ],
      date: new Date("2024-06-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 190, reps: 6 },
        { weight: 195, reps: 4 },
        { weight: 200, reps: 5 },
      ],
      date: new Date("2024-07-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 205, reps: 6 },
        { weight: 210, reps: 4 },
        { weight: 215, reps: 5 },
      ],
      date: new Date("2024-08-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 220, reps: 6 },
        { weight: 225, reps: 5 },
        { weight: 230, reps: 4 },
      ],
      date: new Date("2024-09-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 235, reps: 6 },
        { weight: 240, reps: 5 },
        { weight: 245, reps: 4 },
      ],
      date: new Date("2024-10-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 250, reps: 6 },
        { weight: 255, reps: 5 },
        { weight: 260, reps: 4 },
      ],
      date: new Date("2024-11-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 265, reps: 6 },
        { weight: 270, reps: 5 },
        { weight: 275, reps: 4 },
      ],
      date: new Date("2024-12-01"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 265, reps: 6 },
        { weight: 270, reps: 5 },
        { weight: 300, reps: 4 },
      ],
      date: new Date("2024-12-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 50, reps: 6 },
        { weight: 50, reps: 5 },
        { weight: 55, reps: 4 },
      ],
      date: new Date("2023-01-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-02-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-03-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-04-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-05-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-06-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-07-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-07-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-09-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 60, reps: 4 },
      ],
      date: new Date("2023-10-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      sets: [
        { weight: 60, reps: 6 },
        { weight: 60, reps: 5 },
        { weight: 70, reps: 4 },
      ],
      date: new Date("2023-11-02"),
    },
    {
      exercise: {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
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
    workout.favorite = !workout.favorite;
  } else {
    console.log(`Workout with name "${workoutName}" not found.`);
  }
};
