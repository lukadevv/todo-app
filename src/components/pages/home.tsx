import { Box, Fade } from "@mui/material";
import { AddTask } from "../molecules/AddTask";
import { LatestTasks } from "../organisms/LatestTasks";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { AddCircle, GitHub } from "@mui/icons-material";
import { DashboardStats } from "../molecules/DashboardStats";

export function HomePage() {
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
          },
        ]}
      />
      <Fade in timeout={600}>
        <Box
          component={"section"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <DashboardStats />
          <AddTask />
          <LatestTasks />
        </Box>
      </Fade>
    </>
  );
}
