import {
  ChartContainer,
  lineElementClasses,
  LinePlot,
  markElementClasses,
} from "@mui/x-charts";
import { useTasks } from "../../hooks/task.hook";
import { useMemo } from "preact/hooks";
import { Box, Typography } from "@mui/material";

export default function LineStats() {
  const { tasks } = useTasks();

  const chartData = useMemo(() => {
    const counts: Record<number, number> = {};

    tasks.forEach(({ createdAt }) => {
      const hour = new Date(createdAt).getHours();
      counts[hour] = (counts[hour] || 0) + 1;
    });

    return Array.from({ length: 24 }, (_, i) => counts[i] || 0);
  }, [tasks]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ChartContainer
        width={160}
        height={130}
        series={[{ type: "line", data: chartData }]}
        xAxis={[
          {
            scaleType: "point",
            data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
          },
        ]}
        sx={{
          [`& .${lineElementClasses.root}`]: {
            stroke: (theme) => theme.palette.primary.dark,
            strokeWidth: 4,
          },
          [`& .${markElementClasses.root}`]: {
            stroke: "#8884d8",
            scale: "0.9",
            fill: "#fff",
            strokeWidth: 2,
          },
        }}
        disableAxisListener
      >
        <LinePlot />
      </ChartContainer>
      <Typography
        sx={{
          opacity: 0.9,
          textTransform: "capitalize",
        }}
      >
        Tasks created
      </Typography>
    </Box>
  );
}
