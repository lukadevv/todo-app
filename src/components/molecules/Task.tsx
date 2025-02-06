import {
  Box,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { TaskEntityType } from "../../models/task.model";
import { changeTask } from "../../services/tasks/change";
import { DateRange, Delete } from "@mui/icons-material";

export function Task({
  description,
  done,
  deleted,
  createdAt,
  priority,
}: TaskEntityType) {
  return (
    <ListItem
      divider
      sx={{
        opacity: deleted ? 0.7 : undefined,
      }}
    >
      <ListItemAvatar>
        <Checkbox
          checked={done}
          onClick={() =>
            changeTask(createdAt, (task) => ({
              ...task,
              done: done ? false : true,
            }))
          }
          sx={{
            mr: 1,
          }}
          disabled={deleted}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          width: "100%",
          textDecoration: deleted ? "line-through" : undefined,
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
        disabled={deleted}
        onClick={() =>
          changeTask(createdAt, (task) => ({
            ...task,
            deleted: true,
          }))
        }
        sx={{
          minWidth: 0,
        }}
      >
        <Delete color="error" />
      </ListItemButton>
    </ListItem>
  );
}
