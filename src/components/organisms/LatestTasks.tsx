import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Typography,
} from "@mui/material";
import { useTasks } from "../../hooks/task.hook";
import { useMemo, useState } from "preact/hooks";
import { Task as TaskComponent } from "../molecules/Task";
import { ExpandMore, ListAlt } from "@mui/icons-material";
import { appendUrlPath } from "../../utils/path";

export function LatestTasks() {
  const { tasks: rawTasks } = useTasks();
  const tasks = useMemo(
    () =>
      [...rawTasks].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      ),
    [rawTasks]
  );

  const [open, setOpen] = useState<boolean>(true);

  return (
    <Accordion
      sx={{
        borderRadius: "15px",
        "&.MuiAccordion-root": {
          position: "inherit",
        },
        border: "1px solid gray"
      }}
      expanded={open}
      onChange={(_, value) => setOpen(value)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="latest-task-content"
        sx={{
          ".MuiAccordionSummary-content": {
            width: "100%",
          },
        }}
      >
        <Typography
          variant="h5"
          m={1}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <ListAlt />
          {`Latest tasks (${tasks.length})`}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box mt={1}>
          <List>
            {tasks.map((each) => (
              <TaskComponent
                key={each.createdAt}
                {...each}
                href={appendUrlPath(`/projects/${each.project}`)}
              />
            ))}
          </List>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
