import internal from "stream";
import { Exercise } from "./types";
import { Friend } from "./types";

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
      favExercise: { name: "Hip Adductors" },
    },
  ];
};
