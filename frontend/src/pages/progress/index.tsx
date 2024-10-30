import React, { useState } from "react";
import Header from "@/components/Header";
import { getExerciseLogs, getWorkouts } from "@/mockRest";
import { SingleAutocomplete } from "@/components/Autocomplete";
import ProgressChart from "@/components/ProgressChart";

const Progress = () => {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [chartData, setChartData] = useState<{
    xAxis: string[];
    yAxis: number[];
  }>({
    xAxis: [],
    yAxis: [],
  });
  const [activeButton, setActiveButton] = useState<string>("YTD"); // New state to track active button

  const handleYTDClick = (exercise: string) => {
    const ytdData: { xAxis: string[]; yAxis: number[] } = getYTD(
      exercise,
      2024
    );
    setChartData(ytdData);
    setActiveButton("YTD");
  };

  const handlePastYearClick = () => {
    if (selectedExercise) {
      const pastYearData = getDataForExercisePastYear(selectedExercise);
      setChartData(pastYearData);
      setActiveButton("1 Year");
    }
  };

  const workouts = getWorkouts();
  let exercises = workouts.flatMap((workout) =>
    workout.exercises.map((exercise) => exercise.name)
  );
  exercises = Array.from(new Set(exercises));

  const handleExerciseChange = (exercise: string | null) => {
    setSelectedExercise(exercise);
    console.log("Selected Exercise:", exercise);
    // Automatically fetch YTD data whenever an exercise is selected
    if (exercise) {
      handleYTDClick(exercise);
    } else {
      // Reset chart data when no exercise is selected
      setChartData({ xAxis: [], yAxis: [] });
    }
  };

  // Gets year-to-date data (Jan of current year - Dec of current year)
  const getYTD = (
    exerciseName: string,
    year: number
  ): { xAxis: string[]; yAxis: number[] } => {
    const exerciseLogs = getExerciseLogs();

    const filteredLogs = exerciseLogs.filter(
      (log) => log.exercise.name === exerciseName
    );
    const monthlyData: { [key: string]: number } = {};

    filteredLogs.forEach((log) => {
      const monthKey = log.date.toISOString().slice(0, 7); // YYYY-MM format
      const maxWeight = Math.max(...log.sets.map((set) => set.weight));

      // Store the max weight for the month if it doesn't exist or if the current weight is higher
      if (!monthlyData[monthKey] || maxWeight > monthlyData[monthKey]) {
        monthlyData[monthKey] = maxWeight;
      }
    });

    // Prepare output arrays for all months of the specified year
    const yAxis: number[] = [];
    const xAxis = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    for (let month = 0; month < 12; month++) {
      const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`; // YYYY-MM format

      // Get the max weight for that month, or 0 if no data is available
      yAxis.push(monthlyData[monthKey] || 0);
    }

    return { xAxis, yAxis };
  };

  const getDataForExercisePastYear = (
    exerciseName: string
  ): { xAxis: string[]; yAxis: number[] } => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyMaxWeights = new Array(12).fill(-1);

    const logs = getExerciseLogs(); // Fetch logs from the API

    // Filter logs for the specified exercise within the last year
    logs.forEach((log) => {
      if (
        log.exercise.name === exerciseName &&
        log.date >= oneYearAgo &&
        log.date <= currentDate
      ) {
        const month = log.date.getMonth();
        const maxWeight = Math.max(...log.sets.map((set) => set.weight));

        // Update the monthly max weight if it's higher
        if (maxWeight > monthlyMaxWeights[month]) {
          monthlyMaxWeights[month] = maxWeight;
        }
      }
    });

    // Create lists for the month abbreviations and the corresponding max weights
    const xAxis: string[] = [];
    const yAxis: number[] = [];

    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentMonth + i) % 12;
      xAxis.push(monthNames[monthIndex]);
      yAxis.push(
        monthlyMaxWeights[monthIndex] === -1 ? 0 : monthlyMaxWeights[monthIndex]
      ); // Replace -1 with 0 if no weights lifted
    }

    let firstElementX: string | undefined = xAxis.shift();
    if (firstElementX) {
      xAxis.push(firstElementX);
    }
    let firstElementY: number | undefined = yAxis.shift();
    if (firstElementY) {
      yAxis.push(firstElementY);
    }

    return { xAxis, yAxis };
  };

  return (
    <div>
      <Header />
      <div className="relative bg-darkPurple top-10 rounded-lg p-6 ml-20 mr-20">
        <h1 className="text-white text-2xl mb-6">Workout Name</h1>
        <div className="w-3/6 mt-5">
          <SingleAutocomplete
            label="Exercise"
            data={exercises}
            onExerciseChange={handleExerciseChange}
          />
        </div>

        {selectedExercise && (
          <div>
            <button
              className={`mt-5 ml-5 hover:bg-transparent hover:underline hover:text-purple ${
                activeButton === "YTD" ? "underline text-purple" : ""
              }`}
              onClick={() => handleYTDClick(selectedExercise)}
            >
              YTD
            </button>
            <button
              className={`mt-5 ml-5 hover:bg-transparent hover:underline hover:text-purple ${
                activeButton === "1 Year" ? "underline text-purple" : ""
              }`}
              onClick={handlePastYearClick}
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
