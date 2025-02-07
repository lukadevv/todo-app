import { Box, Card, CardContent, Fade, List, Typography } from "@mui/material";
import { useTasks } from "../../hooks/task.hook";
import { useMemo } from "preact/hooks";
import { Task } from "../molecules/Task";
import { useRouter } from "preact-router";
import { ProjectStats } from "../molecules/ProjectStats";
import { Breadcrumbs } from "../molecules/Breadcrumbs";
import { AddCircle, Folder, GitHub } from "@mui/icons-material";
import { appendUrlPath } from "../../utils/path";

export function ProjectViewPage() {
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
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .sort((a, b) => {
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }),
    [rawTasks, id]
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
            name: "Project",
            icon: <Folder fontSize="inherit" color="inherit" />,
          },
        ]}
      />
      <Fade in timeout={600}>
        <Box
          component={"section"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <ProjectStats project={id} />
          <Card
            sx={{
              border: "1px solid gray",
            }}
          >
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
      </Fade>
    </>
  );
}
