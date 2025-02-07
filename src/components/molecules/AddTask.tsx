import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "preact/hooks";
import { TaskEntityType, TaskPriority } from "../../models/task.model";
import { useTasks } from "../../hooks/task.hook";
import { PriorityButton } from "../atoms/PriorityButton";
import { Add } from "@mui/icons-material";

export function AddTask() {
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<TaskPriority>("LOW");
  const { tasks, addTask } = useTasks();

  const defaultProjectValue = useMemo(
    () =>
      [...tasks].sort(
        (a, b) => b.createdAt.getDate() - a.createdAt.getDate()
      )[0]?.project ?? "My Tasks",
    [tasks]
  );

  const [project, setRawProject] =
    useState<TaskEntityType["project"]>(defaultProjectValue);

  const setProject = useCallback(
    (value: string) => {
      setRawProject(value);
    },
    [setRawProject]
  ) as React.Dispatch<React.SetStateAction<TaskEntityType["project"]>>;

  const isValid = useMemo(
    () => description.length > 0 && project.length > 0,
    [description, project]
  );

  return (
    <Card
      sx={{
        border: "1px solid gray",
      }}
    >
      <CardContent>
        <Typography variant="h5" mb={3}>
          Add task
        </Typography>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          gap={"5px"}
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();

            addTask({
              description,
              priority,
              project,
            });

            setDescription("");
            setPriority("LOW");
          }}
        >
          <TextField
            label="Description"
            multiline
            rows={4}
            placeholder="An example task"
            variant="filled"
            fullWidth
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            error={description.length < 1}
          />

          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            gap={2}
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                flexDirection: "column",
              },
            })}
          >
            <PriorityButton value={priority} setValue={setPriority} />
            <SelectProjects state={project} setState={setProject} />
            <Button
              fullWidth
              variant="contained"
              type={"submit"}
              disabled={!isValid}
              sx={{
                height: "57px",
                border: "1px solid gray",
                width: "25%"
              }}
            >
              <Add />
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function SelectProjects({
  state,
  setState,
}: {
  state: TaskEntityType["project"];
  setState: React.Dispatch<React.SetStateAction<TaskEntityType["project"]>>;
}) {
  const { projects } = useTasks();

  return (
    <Autocomplete
      id="projects"
      sx={(theme) => ({
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
      })}
      options={projects.map((_, index) => index)}
      getOptionLabel={(option: any) => String(projects?.[option] ?? option)}
      renderInput={(params: any) => (
        <TextField variant="filled" {...params} label="Project" />
      )}
      onInputChange={(_, value) => setState(value ?? "")}
      value={state}
      freeSolo
      disableClearable
    />
  );
}
