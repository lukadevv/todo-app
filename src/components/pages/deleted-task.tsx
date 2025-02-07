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
import { AddCircle, Clear, Delete, GitHub } from "@mui/icons-material";
import { clearDeletedTasks } from "../../services/tasks/clear";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { appendUrlPath } from "../../utils/path";

export function DeletedTasks() {
  const { tasks: rawTasks } = useTasks();
  const deletedTasks = useMemo(
    () => rawTasks.filter((each) => each.deleted),
    [rawTasks]
  );

  return (
    <>
      <Breadcrumbs
        sections={[
          {
            name: "GitHub",
            icon: <GitHub fontSize="inherit" />,
            href: import.meta.env.VITE_GITHUB_URL,
          },
          {
            name: "Dashboard",
            icon: <AddCircle fontSize="inherit" />,
            href: appendUrlPath("/"),
          },
          {
            name: "Deleted Tasks",
            icon: <Delete fontSize="inherit" color="inherit" />,
          },
        ]}
      />
      <Box component={"section"}>
        <Card
          sx={{
            border: "1px solid gray",
          }}
        >
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
    </>
  );
}
