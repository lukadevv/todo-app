import { Box, Card, CardContent, List, Typography } from "@mui/material";
import { useTasks } from "../../hooks/task.hook";
import { useMemo } from "preact/hooks";
import { Task } from "../molecules/Task";

export function LatestTasks() {
  const { tasks: rawTasks } = useTasks();
  const tasks = useMemo(
    () =>
      [...rawTasks].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      ),
    [rawTasks]
  );

  return (
    <Box component={"section"}>
      <Card>
        <CardContent>
          <Typography variant="h5">{`Latest tasks (${tasks.length})`}</Typography>
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
