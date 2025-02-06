import {
  Box,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { TaskEntityType } from "../../models/task.model";
import { changeTask } from "../../services/tasks/change";
import { DateRange, Restore } from "@mui/icons-material";

export function DeletedTask({
  description,
  createdAt,
  priority,
}: TaskEntityType) {
  return (
    <ListItem divider>
      <ListItemText
        sx={{
          width: "100%",
        }}
      >
        <Box display={"flex"} flexDirection={"column"}>
          <Typography mb={2}>{description}</Typography>
          <Box display={"flex"} gap={1.6} alignItems={"center"}>
            <Box display={"flex"} gap={0.5}>
              <DateRange color="secondary" opacity={0.8} />
              <Typography color="secondary" fontWeight={"bold"}>
                {`${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`}
              </Typography>
            </Box>
            <Box display={"flex"} gap={0.3}>
              <Typography color="textDisabled">Priority: </Typography>
              <Typography color="secondary" fontWeight={"bold"}>
                {priority.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </ListItemText>
      <ListItemButton
        onClick={() =>
          changeTask(createdAt, (task) => ({
            ...task,
            deleted: false,
          }))
        }
        sx={{
          minWidth: 0,
        }}
      >
        <Restore color="success" />
      </ListItemButton>
    </ListItem>
  );
}
