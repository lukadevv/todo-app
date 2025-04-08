import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from "../atoms/Logo";
import { HamburgerMenuDrawer } from "../molecules/HamburgerMenuDrawer";
import { useState } from "preact/hooks";
import { SearchBar } from "../atoms/SearchBar";
import { GithubButton } from "../atoms/GitHubButton";

export function NavigationBar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box
      sx={{
        height: "77px",
      }}
    >
      <AppBar variant="elevation">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "5px",
          }}
          variant="dense"
        >
          <Box display={"flex"} alignItems={"center"} gap={"5px"}>
            <Hamburger open={() => setOpen(true)} />
            <NavLogo />
            <HamburgerMenuDrawer open={open} setOpen={setOpen} />
          </Box>
          <Box>
            <SearchBar />
          </Box>
          <Box>
            <GithubButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function Hamburger({ open }: { open: () => void }) {
  return (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open menu"
      onClick={open}
    >
      <MenuIcon />
    </IconButton>
  );
}

function NavLogo() {
  return <Logo size={50} />;
}
