import internal from "stream";
import { Exercise } from "./mockRest";

type Friend = {
  name: string;
  active: boolean;
  lastLogged: number;
  favExercise: Exercise;
};

export const getFriends = (): Friend[] => {
  return [
    {
      name: "Jack",
      active: true,
      lastLogged: 2,
      favExercise: { name: "Glutes" },
    },
    {
      name: "Noah",
      active: false,
      lastLogged: 1,
      favExercise: { name: "Bulgarian Split Squats" },
    },
  ];
};
