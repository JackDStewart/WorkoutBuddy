import { ReactNode } from "react";

export interface Exercise {
  name: string;
  equipment: string;
  muscleGroup: string;
  userAuth0Id?: string;
}

export interface Workout {
  id?: number;
  name: string;
  exercises?: Exercise[];
  favorite: boolean;
  auth0id?: string;
}

export interface SetLog {
  weight: number;
  reps: number;
}

export interface ExerciseLog {
  exercise: Exercise;
  sets: SetLog[];
  date: Date;
  userAuth0Id?: string;
}

export interface ExerciseLogDTO {
  exercise: Exercise;
  sets: SetLog[];
  date: string;
  userAuth0Id?: User;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Friendship {
  id: number
  sender: User;
  reciever: User;
  status: string;
}

export interface AddedExerciseProps {
  exercises: string[];
  addedList: string[];
  setter: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ExerciseCardProps {
  exerciseLog: ExerciseLog;
  onSetChange: (newSetLogs: SetLog[]) => void;
  onDelete: (exercise: ExerciseLog) => void;
}

export interface DashboardProps {
  id: string;
  workouts: Workout[];
}

export interface RadioProps {
  workouts: Workout[];
}

export interface ModalProps {
  closeButton?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width: string;
}

export interface FriendCardProps {
  friend: User;
  onClick: () => void;
  onAddFriend: () => void;
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

export interface WorkoutLog {
  name: string;
  exercises: ExerciseLog[];
}
