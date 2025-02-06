import { PropsWithChildren } from "preact/compat";
import { NavigationBar } from "../components/organisms/NavigationBar";
import { Box } from "@mui/material";
import { Footer } from "../components/molecules/Footer";

export function UIProvider({ children }: PropsWithChildren) {
  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 77px)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            maxWidth: "1440px",
            width: "100%",
            padding: "15px",
            margin: "auto",
          }}
          component={"main"}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}
