import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { useTasks } from "../../hooks/task.hook";
import { useMemo } from "preact/hooks";
import { DeletedTask } from "../molecules/DeletedTask";
import { Clear } from "@mui/icons-material";
import { clearDeletedTasks } from "../../services/tasks/clear";

export function DeletedTasks() {
  const { tasks: rawTasks } = useTasks();
  const deletedTasks = useMemo(
    () => rawTasks.filter((each) => each.deleted),
    [rawTasks]
  );

  return (
    <Box component={"section"}>
      <Card>
        <CardContent>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5">{`Deleted tasks (${deletedTasks.length})`}</Typography>
            <IconButton color="error" onClick={() => clearDeletedTasks()}>
              <Clear />
            </IconButton>
          </Box>
          <Box mt={1}>
            <List>
              {deletedTasks.map((each) => (
                <DeletedTask key={each.createdAt} {...each} />
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
