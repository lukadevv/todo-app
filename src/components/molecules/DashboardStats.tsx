import { Card, CardContent } from "@mui/material";
import { ProgressBar } from "../atoms/ProgressBar";
import { useMemo } from "preact/hooks";
import { useTasks } from "../../hooks/task.hook";

export function DashboardStats() {
  const { tasks, projects } = useTasks();
  const tasksCompleted = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((each) => each.done).length;

    if (total < 1 || completed < 1) return 0;
    return Math.min(100, Math.max(1, Math.round((completed / total) * 100)));
  }, [tasks]);

  const projectsCompleted = useMemo(() => {
    let completed = 0;

    projectLoop: for (const project of projects) {
      for (const task of tasks) {
        if (task.project !== project) {
          continue;
        }

        if (!task.done) {
          continue projectLoop;
        }

        completed++;
      }
    }

    const total = projects.length;

    if (total < 1 || completed < 1) return 0;
    return Math.min(100, Math.max(1, Math.round((completed / total) * 100)));
  }, [tasks, projects]);

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
        <ProgressBar value={projectsCompleted} label="projects completed" />
      </CardContent>
    </Card>
  );
}
