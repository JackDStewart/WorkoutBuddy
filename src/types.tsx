import { ReactNode } from "react";

export interface Exercise {
  name: string;
}

export interface Workout {
  name: string;
  exercises: Exercise[];
  isFavorite: boolean
}

export interface SetLog {
  weight: number;
  reps: number;
}

export interface ExerciseLog {
  exercise: Exercise;
  sets: SetLog[];
  date: Date;
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
  width: string
}

export interface FriendCardProps {
  friend: Friend;
  onClick: () => void;
  className?: string;
}

export interface ProgressChartProps {
  xAxis: string[];
  yAxis: number[];
}

export interface AutocompleteProps<T = string> {
  label: string;
  data: T[];
  onExerciseChange?: OnChangeHandler<T>; //optional handler, added to extract data from textbox
}

export type OnChangeHandler<T> = (
  value: T | null // The selected value, which can be null
) => void;
