import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useTasks } from "../../hooks/task.hook";
import { useMemo } from "preact/hooks";
import { Task } from "../molecules/Task";
import { useRouter } from "preact-router";

export function ProjectView() {
  const [
    {
      matches: { id },
    },
  ] = useRouter() as any;

  const { tasks: rawTasks } = useTasks();
  const tasks = useMemo(
    () =>
      rawTasks
        .filter((each) => each.project.toLowerCase() === id.toLowerCase())
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [rawTasks, id]
  );

  return (
    <Box component={"section"}>
      <Card>
        <CardContent>
          <Box display={"flex"} gap={1}>
            <Typography variant="h5" textTransform={"capitalize"}>
              {id}
            </Typography>
            <Typography variant="h5">{`(${tasks.length})`}</Typography>
          </Box>
          <Box mt={1}>
            <List>
              {tasks.map((each) => (
                <Task key={each.createdAt} {...each} />
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
