import { CoreProvider } from "./core.provider";
import { HomePage } from "../pages/home/home";

export function App() {
  return (
    <CoreProvider>
      <HomePage />
    </CoreProvider>
  );
}
