import { Close, DashboardCustomize, Delete, Tag } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  List,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  MenuItem,
  Typography,
} from "@mui/material";
import { Logo } from "../atoms/Logo";
import { useTasks } from "../../hooks/task.hook";
import { useMemo } from "preact/hooks";
import { appendUrlPath } from "../../utils/path";

type HamburgerMenuDrawerProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
};

export function HamburgerMenuDrawer({
  open,
  setOpen,
}: HamburgerMenuDrawerProps) {
  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={() => setOpen(false)}
    >
      <Box padding={"5px"} width={"300px"} maxWidth={"100vw"}>
        <Button
          sx={{
            position: "absolute",
            left: "100%",
            minWidth: "inherit",
            transform: "translate(-110%)",
          }}
          size="small"
          color="inherit"
          onClick={() => setOpen(false)}
        >
          <Close
            sx={{
              opacity: 0.5,
            }}
          />
        </Button>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Box paddingY={3}>
            <Logo size={75} />
          </Box>
        </Box>

        <Dashboard close={() => setOpen(false)} />
        <Divider
          sx={{
            my: 1,
          }}
        />

        <MyProjects close={() => setOpen(false)} />
        <Divider
          sx={{
            my: 1,
          }}
        />
        <TrashButton close={() => setOpen(false)} />
      </Box>
    </Drawer>
  );
}

function Dashboard({ close }: { close: () => void }) {
  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            background: "none",
          }}
        >
          Home
        </ListSubheader>
      }
    >
      <MenuItem
        component={Link}
        href={appendUrlPath("/")}
        onClick={() => close()}
      >
        <ListItemAvatar
          sx={{
            display: "flex",
          }}
        >
          <DashboardCustomize color="primary" />
        </ListItemAvatar>
        <ListItemText>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography textTransform={"capitalize"}>Dashboard</Typography>
          </Box>
        </ListItemText>
      </MenuItem>
    </List>
  );
}

function MyProjects({ close }: { close: () => void }) {
  const { projects, tasks } = useTasks();
  const sizes = useMemo(() => {
    const result: {
      [key: string]: number;
    } = {};
    for (const project of projects) {
      let counter = 0;

      tasks.forEach((each) => {
        if (each.project === project) {
          counter++;
        }
      });

      result[project] = counter;
    }

    return result;
  }, [projects]);

  return (
    <Box>
      <List
        subheader={
          <ListSubheader
            sx={{
              background: "none",
            }}
          >
            My Projects
          </ListSubheader>
        }
      >
        {projects.map((project) => (
          <MenuItem
            component={Link}
            href={appendUrlPath(`/projects/${project}`)}
            onClick={() => close()}
          >
            <ListItemAvatar
              sx={{
                display: "flex",
              }}
            >
              <Tag color="primary" />
            </ListItemAvatar>
            <ListItemText>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography textTransform={"capitalize"}>{project}</Typography>
                <Typography color="textDisabled">
                  {sizes?.[project] ?? 0}
                </Typography>
              </Box>
            </ListItemText>
          </MenuItem>
        ))}
      </List>
    </Box>
  );
}

function TrashButton({ close }: { close: () => void }) {
  const { tasks } = useTasks();
  const size = useMemo(
    () =>
      tasks.reduce((counter, each) => {
        if (each.deleted) {
          counter++;
        }

        return counter;
      }, 0),
    []
  );

  return (
    <List
      subheader={
        <ListSubheader
          sx={{
            background: "none",
          }}
        >
          Trash
        </ListSubheader>
      }
    >
      <MenuItem
        component={Link}
        href={appendUrlPath("/deleted-tasks")}
        onClick={() => close()}
        disabled={size === 0}
      >
        <ListItemAvatar
          sx={{
            display: "flex",
          }}
        >
          <Delete color="primary" />
        </ListItemAvatar>
        <ListItemText>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography textTransform={"capitalize"}>Deleted tasks</Typography>
            <Typography color="textDisabled">{size}</Typography>
          </Box>
        </ListItemText>
      </MenuItem>
    </List>
  );
}
