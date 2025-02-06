import { CoreProvider } from "./core.provider";
import { Routes } from "../routes/routes";

export function App() {
  return (
    <CoreProvider>
      <Routes />
    </CoreProvider>
  );
}
