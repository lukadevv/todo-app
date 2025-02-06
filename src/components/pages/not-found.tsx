import { Box, Typography } from "@mui/material";

export function NotFound() {
  return (
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
  );
}
