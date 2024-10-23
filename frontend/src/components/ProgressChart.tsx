import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { ProgressChartProps } from "@/types";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const ProgressChart: React.FC<ProgressChartProps> = ({ xAxis, yAxis }) => {
  return (
    <LineChart
      xAxis={[{ scaleType: "point", data: xAxis }]}
      series={[
        {
          data: yAxis,
          color: "#BB86FC"
        },
      ]}
      height={300}
      sx={(theme) => ({
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "white",
            strokeWidth: 3,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "white",
          },
        },
      })}
    />
  );
};

export default ProgressChart;
