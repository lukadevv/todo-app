import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useTasks } from "../../hooks/task.hook";
import { route } from "preact-router";
import { appendUrlPath } from "../../utils/path";

export function SearchBar() {
  const { tasks } = useTasks();

  return (
    <Autocomplete
      disablePortal
      options={tasks.map((task) => task.createdAt)}
      sx={(theme) => ({
        width: "50vw",
        minWidth: 0,
        [theme.breakpoints.down("sm")]: {
          visibility: "hidden",
          width: 0,
        },
      })}
      renderInput={(params: any) => (
        <TextField
          {...params}
          label={
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={0.8}
            >
              <SearchIcon />
              Search
            </Box>
          }
          variant="filled"
        />
      )}
      getOptionLabel={(option) =>
        tasks.find((each) => each.createdAt === option)?.description ?? ""
      }
      onChange={(_: any, createdAt: any) => {
        const projectId = tasks.find(
          (each) => each.createdAt === createdAt
        )?.project;

        if (projectId) {
          route(appendUrlPath(`/projects/${projectId}`));
        } else {
          route(appendUrlPath(`/`));
        }
      }}
    />
  );
}
