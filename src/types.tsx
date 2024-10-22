import { ReactNode } from "react";

export interface Exercise {
  name: string;
}

export interface Workout {
  name: string;
  exercises: Exercise[];
}

export interface SetLog {
  weight: number;
  reps: number;
}

export interface ExerciseLog {
  exercise: Exercise;
  sets: SetLog[];
  date: Date
}

export type Friend = {
  name: string;
  active: boolean;
  lastLogged: number;
  favExercise: Exercise;
};

export interface ExerciseCardProps {
  exerciseLog: ExerciseLog;
  onSetChange: (newSetLogs: SetLog[]) => void;
}

export interface DashboardProps {
  workouts: Workout[];
}

export interface RadioProps {
  workouts: string[];
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface FriendCardProps {
  friend: Friend;
  onClick: () => void;
  className?: string;
}

export interface AutocompleteProps {
  label: string;
  data: string[];
}

export interface ProgressChartProps {
  xAxis: string[];
  yAxis: number[];
}
