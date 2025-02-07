import { Card, CardContent } from "@mui/material";
import { ProgressBar } from "../atoms/ProgressBar";
import { useMemo } from "preact/hooks";
import { useTasks } from "../../hooks/task.hook";

export function ProjectStats({ project }: { project: string }) {
  const { tasks: rawTasks } = useTasks();
  const tasksCompleted = useMemo(() => {
    const tasks = rawTasks.filter((each) => each.project === project);
    const total = tasks.length;
    const completed = tasks.filter((each) => each.done).length;

    if (total < 1 || completed < 1) return 0;
    return Math.min(100, Math.max(1, Math.round((completed / total) * 100)));
  }, [rawTasks]);

  return (
    <Card
      sx={{
        border: "1px solid gray",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <ProgressBar value={tasksCompleted} label="tasks completed" />
      </CardContent>
    </Card>
  );
}
