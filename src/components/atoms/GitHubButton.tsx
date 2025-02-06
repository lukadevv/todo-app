import { GitHub } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export function GithubButton() {
  return (
    <IconButton
      component={"a"}
      href={import.meta.env.VITE_GITHUB_URL}
      sx={{
        margin: "auto",
        border: (theme) => `${theme.palette.primary.main} 2px solid`,
        ":hover": {
          border: ({ palette }) => `2px solid ${palette.secondary.dark}`,
        },
      }}
      size="small"
      aria-label="Owner GitHub profile"
    >
      <GitHub />
    </IconButton>
  );
}
