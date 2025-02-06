import { createContext } from "preact";
import { TaskStorageEntityType } from "../models/task-storage.model";
import { useEffect, useState } from "preact/hooks";
import { extractTasks } from "../services/tasks/extract";
import { TASKS_EVENT_ID } from "../services/tasks/utils";
import { PropsWithChildren } from "preact/compat";

export const TaskContext = createContext<TaskStorageEntityType>({
  tasks: [],
});

export function TaskProvider({ children }: PropsWithChildren) {
  const [tasks, setStateTasks] = useState<TaskStorageEntityType>({
    tasks: [],
  });

  useEffect(() => {
    // Load tasks first time and when it changes!

    const listener = () => {
      setStateTasks(extractTasks());
    };

    // Init it
    setStateTasks(extractTasks());

    // Load it
    document.addEventListener(TASKS_EVENT_ID, listener);

    // Unload it
    return () => document.removeEventListener(TASKS_EVENT_ID, listener);
  }, []);

  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
}
