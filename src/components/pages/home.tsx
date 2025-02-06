import { Box } from "@mui/material";
import { AddTask } from "../molecules/AddTask";
import { LatestTasks } from "../organisms/LatestTasks";

export function HomePage() {
  return (
    <Box
      component={"section"}
      display={"flex"}
      flexDirection={"column"}
      gap={4}
    >
      <AddTask />
      <LatestTasks />
    </Box>
  );
}
