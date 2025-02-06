import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { useCallback, useMemo, useState } from "preact/hooks";
import { TaskEntityType, TaskPriority } from "../../models/task.model";
import { useTasks } from "../../hooks/task.hook";

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
    <Card>
      <CardContent>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
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
            <PriorityButton state={priority} setPriority={setPriority} />
            <SelectProjects state={project} setState={setProject} />
          </Box>

          <Button
            fullWidth
            variant="contained"
            type={"submit"}
            disabled={!isValid}
          >
            Add task
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function PriorityButton({
  state,
  setPriority,
}: {
  state: TaskPriority;
  setPriority: React.Dispatch<React.SetStateAction<TaskPriority>>;
}) {
  return (
    <ButtonGroup fullWidth variant="outlined">
      <Button onClick={() => setPriority("LOW")} disabled={state === "LOW"}>
        {"LOW" as TaskPriority}
      </Button>
      <Button
        onClick={() => setPriority("MEDIUM")}
        disabled={state === "MEDIUM"}
      >
        {"MEDIUM" as TaskPriority}
      </Button>
      <Button onClick={() => setPriority("HIGH")} disabled={state === "HIGH"}>
        {"HIGH" as TaskPriority}
      </Button>
    </ButtonGroup>
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
