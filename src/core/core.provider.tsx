import { MuiProvider } from "../theme/mui.provider";

export function CoreProvider({ children }: React.PropsWithChildren) {
  return <MuiProvider>{children}</MuiProvider>;
}
