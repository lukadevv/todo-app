import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./styles/dark.theme";

export function MuiProvider({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
