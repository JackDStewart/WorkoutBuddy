import { ReactNode } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface Exercise {
  name: string;
}

export interface Workout {
  name: string;
  exercises: Exercise[];
}

export interface DashboardProps {
  workouts: Workout[]
}

export interface RadioProps {
  workouts: string[]
}