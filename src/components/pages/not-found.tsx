import { Box, Fade, Typography } from "@mui/material";

export function NotFound() {
  return (
    <Fade in timeout={600}>
      <Box
        component={"section"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        my={"10vh"}
      >
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Page not found</Typography>
      </Box>
    </Fade>
  );
}
