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
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Squat",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Plank",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Lat Pulldown",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Bicep Curls",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: true,
  },
  {
    name: "Push A",
    exercises: [
      {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Shoulder Press",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Push-ups",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: true,
  },
  {
    name: "Pull A",
    exercises: [
      {
        name: "Dumbbell Rows",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Pull Ups",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Bicep Curls",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Hammer Curls",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Lat Pulldowns",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Pull B",
    exercises: [
      {
        name: "Barbell Rows",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Pull Ups",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Bicep Curls",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Hammer Curls",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Lat Pulldowns",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Legs",
    exercises: [
      {
        name: "Squats",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Lunges",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Leg Press",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Calf Raises",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Deadlifts",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Full Body",
    exercises: [
      {
        name: "Burpees",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Kettlebell Swings",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Push-ups",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Mountain Climbers",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Plank",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Cardio Blast",
    exercises: [
      {
        name: "Running",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Cycling",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Jump Rope",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Rowing Machine",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Box Jumps",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: true,
  },
  {
    name: "Core Workout",
    exercises: [
      {
        name: "Crunches",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Russian Twists",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Plank",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Leg Raises",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Bicycle Crunches",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Yoga Flow",
    exercises: [
      {
        name: "Downward Dog",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Warrior II",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Child's Pose",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Tree Pose",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Cobra Pose",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: true,
  },
  {
    name: "HIIT Circuit",
    exercises: [
      {
        name: "High Knees",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Burpees",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Squat Jumps",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Jumping Jacks",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Plank Jacks",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Strength Training",
    exercises: [
      {
        name: "Squats",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Deadlifts",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Bench Press",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Pull-Ups",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Overhead Press",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: true,
  },
  {
    name: "Upper Body",
    exercises: [
      {
        name: "Push-ups",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Tricep Extensions",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Chest Fly",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Dumbbell Rows",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Front Raises",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: false,
  },
  {
    name: "Lower Body",
    exercises: [
      {
        name: "Leg Extensions",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Leg Curls",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Glute Bridges",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Hip Thrusts",
        equipment: "",
        muscleGroup: "",
      },
      {
        name: "Side Lunges",
        equipment: "",
        muscleGroup: "",
      },
    ],
    isFavorite: true,
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
    workout.isFavorite = !workout.isFavorite;
  } else {
    console.log(`Workout with name "${workoutName}" not found.`);
  }
};
