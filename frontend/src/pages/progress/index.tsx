import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SingleAutocomplete } from "@/components/Autocomplete";
import ProgressChart from "@/components/ProgressChart";
import {
  fetchExercisesUserHasDone,
  fetchExerciseLogs,
} from "@/api/exerciseLogApi";
import { Exercise, ExerciseLogDTO } from "@/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileClient from "@/components/ProfileClient";

const Progress = () => {
  const { user } = useUser();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [chartData, setChartData] = useState<{
    xAxis: string[];
    yAxis: number[];
  }>({ xAxis: [], yAxis: [] });
  const [activeButton, setActiveButton] = useState("YTD");

  useEffect(() => {
    const loadExercises = async () => {
      if (user?.sub) {
        const fetchedExercises = await fetchExercisesUserHasDone(
          user.sub.substring(14)
        );
        setExercises(fetchedExercises);
      }
    };
    loadExercises();
  }, [user]);

  const handleExerciseChange = (exerciseName: string | null) => {
    const selected =
      exercises.find((exercise) => exercise.name === exerciseName) || null;
    setSelectedExercise(selected);
    selected ? loadYTDData(selected) : resetChartData();
  };

  const loadYTDData = async (exercise: Exercise) => {
    const data = await getYTDData(exercise, new Date().getFullYear());
    setChartData(data);
    setActiveButton("YTD");
  };

  const loadPastYearData = async () => {
    if (selectedExercise) {
      const data = await getPastYearData(selectedExercise);
      setChartData(data);
      setActiveButton("1 Year");
    }
  };

  const getYTDData = async (exercise: Exercise, year: number) => {
    if (user?.sub) {
      const exerciseLogs = await fetchExerciseLogs(
        user.sub.substring(14),
        exercise
      );
      const xAxis = Array.from({ length: 12 }, (_, i) =>
        new Date(year, i).toLocaleString("default", { month: "short" })
      );
      const yAxis = Array.from({ length: 12 }, (_, i) =>
        getMaxWeightForMonth(exerciseLogs, year, i)
      );
      return { xAxis, yAxis };
    }
    return { xAxis: [], yAxis: [] };
  };

  const getPastYearData = async (exercise: Exercise) => {
    if (user?.sub) {
      const exerciseLogs = await fetchExerciseLogs(
        user.sub.substring(14),
        exercise
      );
      const currentDate = new Date();
      const oneYearAgo = new Date(currentDate);
      oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

      const data = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(oneYearAgo);
        date.setMonth(oneYearAgo.getMonth() + i);
        return {
          month: date.toLocaleString("default", { month: "short" }),
          weight: getMaxWeightForMonth(
            exerciseLogs,
            date.getFullYear(),
            date.getMonth()
          ),
        };
      });

      return {
        xAxis: data.map((d) => d.month),
        yAxis: data.map((d) => d.weight || 0),
      };
    }
    return { xAxis: [], yAxis: [] };
  };

  const getMaxWeightForMonth = (
    logs: ExerciseLogDTO[],
    year: number,
    month: number
  ) => {
    const monthLogs = logs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate.getFullYear() === year && logDate.getMonth() === month;
    });
    return Math.max(
      ...monthLogs.flatMap((log) => log.sets.map((set) => set.weight)),
      0
    );
  };

  const resetChartData = () => setChartData({ xAxis: [], yAxis: [] });

  return (
    <div>
      <Header />
      <ProfileClient />
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <h1 className="text-white text-2xl mb-6">Workout Name</h1>
        <div className="w-3/6 mt-5">
          <SingleAutocomplete
            label="Exercise"
            data={Array.from(new Set(exercises.map((ex) => ex.name)))}
            onExerciseChange={handleExerciseChange}
          />
        </div>

        {selectedExercise && (
          <div>
            <button
              className={`mt-5 ml-5 ${
                activeButton === "YTD" ? "underline text-purple" : ""
              }`}
              onClick={() => loadYTDData(selectedExercise)}
            >
              YTD
            </button>
            <button
              className={`mt-5 ml-5 ${
                activeButton === "1 Year" ? "underline text-purple" : ""
              }`}
              onClick={loadPastYearData}
            >
              1 Year
            </button>
            <div className="w-3/6">
              <ProgressChart xAxis={chartData.xAxis} yAxis={chartData.yAxis} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
