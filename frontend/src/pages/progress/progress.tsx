import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SingleAutocomplete } from "@/components/Autocomplete";
import ProgressChart from "@/components/ProgressChart";
import {
  fetchExercisesUserHasDone,
  fetchExerciseLogs,
} from "@/api/exerciseLogApi";
import { Exercise, ExerciseLogDTO, User } from "@/types";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import ProfileClient from "@/components/ProfileClient";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

interface ProgressPageProps {
  user: User;
  compareUser?: UserProfile; // Optional second parameter for comparison data
}

const ProgressPage: React.FC<ProgressPageProps> = ({ user, compareUser }) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [chartData, setChartData] = useState<{
    xAxis: string[];
    yAxes: { data: number[]; color?: string; label?: string }[];
  }>({ xAxis: [], yAxes: [] });
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
    const primaryData = await getYTDData(
      user.id,
      exercise,
      new Date().getFullYear()
    );
    const comparisonData = compareUser?.sub?.substring(14)
      ? await getYTDData(
          compareUser.sub.substring(14),
          exercise,
          new Date().getFullYear()
        )
      : null;

    let yAxes: { data: number[]; color?: string; label?: string }[] = [
      {
        data: primaryData.yAxis,
        color: "#FF5722",
        label: user.name.split(" ")[0],
      },
    ];
    if (comparisonData) {
      yAxes.push({
        data: comparisonData.yAxis,
        color: "#BB86FC",
        label: "You",
      });
    } else {
      yAxes = [{ data: primaryData.yAxis, color: "#BB86FC", label: undefined }];
    }

    setChartData({
      xAxis: primaryData.xAxis,
      yAxes: yAxes,
    });
    setActiveButton("YTD");
  };

  const getYTDData = async (
    userId: string,
    exercise: Exercise,
    year: number
  ) => {
    const exerciseLogs = await fetchExerciseLogs(userId, exercise);
    const xAxis = Array.from({ length: 12 }, (_, i) =>
      new Date(year, i).toLocaleString("default", { month: "short" })
    );
    const yAxis = Array.from({ length: 12 }, (_, i) =>
      getMaxWeightForMonth(exerciseLogs, year, i)
    );
    return { xAxis, yAxis };
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

  const resetChartData = () => setChartData({ xAxis: [], yAxes: [] });

  return (
    <div>
      <div className="relative bg-darkPurple rounded-lg p-6 ml-20 mr-20">
        <h1 className="text-white text-2xl mb-6">Workout Progress</h1>
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
              <ProgressChart xAxis={chartData.xAxis} yAxes={chartData.yAxes} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
