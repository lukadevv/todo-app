import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { TaskPriority } from "../../models/task.model";
import { Flag } from "@mui/icons-material";

type PriorityButtonProps = {
  value: TaskPriority;
  setValue: React.Dispatch<React.SetStateAction<TaskPriority>>;
};

export function PriorityButton({ value, setValue }: PriorityButtonProps) {
  return (
    <FormControl variant="filled" sx={{ width: "100%" }}>
      <InputLabel id="priority-button-label">
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
        >
          <Flag /> Priority
        </Box>
      </InputLabel>
      <Select
        labelId="priority-button-label"
        id="priority-button-button"
        value={value}
        onChange={(e: any) => e?.target?.value && setValue(e.target.value)}
        renderValue={(e) => (
          <Typography textTransform={"capitalize"} ml={0.2} fontWeight={"bold"}>
            {e}
          </Typography>
        )}
      >
        <MenuItem value={"LOW" satisfies TaskPriority}>Low</MenuItem>
        <MenuItem value={"MEDIUM" satisfies TaskPriority}>Medium</MenuItem>
        <MenuItem value={"HIGH" satisfies TaskPriority}>High</MenuItem>
      </Select>
    </FormControl>
  );
}
