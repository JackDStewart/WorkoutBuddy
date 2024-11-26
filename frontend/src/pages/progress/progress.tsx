import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SingleAutocomplete } from "@/components/Autocomplete";
import ProgressChart from "@/components/ProgressChart";
import {
  fetchExercisesUserHasDone,
  fetchExerciseLogs,
} from "@/api/exerciseLogApi";
import { Exercise, ExerciseLogDTO, User } from "@/types";
import ProfileClient from "@/components/ProfileClient";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

interface ProgressPageProps {
  user: User;
}

const ProgressPage: React.FC<ProgressPageProps> = ({ user }) => {
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
      if (user?.id) {
        const fetchedExercises = await fetchExercisesUserHasDone(user.id);
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
    if (user?.id) {
      const exerciseLogs = await fetchExerciseLogs(user.id, exercise);
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
    if (user?.id) {
      const exerciseLogs = await fetchExerciseLogs(user.id, exercise);
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
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <h1 className="text-white text-2xl mb-6">Workout Name</h1>
        <div className="flex flex-row justify-between items-start">
          {/* Left Side: SingleAutocomplete */}
          <div className="w-1/2">
            <SingleAutocomplete
              label="Exercise"
              data={Array.from(new Set(exercises.map((ex) => ex.name)))}
              onExerciseChange={handleExerciseChange}
            />
          </div>

          {/* Right Side: ProgressChart */}
          {selectedExercise && (
            <div className="w-1/2">
              <h1 className="text-xl text-center underline">Year To Date</h1>
              <ProgressChart xAxis={chartData.xAxis} yAxis={chartData.yAxis} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
