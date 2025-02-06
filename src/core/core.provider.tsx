import { TaskProvider } from "../providers/task.provider";
import { MuiProvider } from "../theme/mui.provider";
import { UIProvider } from "./ui.provider";

export function CoreProvider({ children }: React.PropsWithChildren) {
  return (
    <TaskProvider>
      <MuiProvider>
        <UIProvider>{children}</UIProvider>
      </MuiProvider>
    </TaskProvider>
  );
}
