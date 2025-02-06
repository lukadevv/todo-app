import { TaskEntityType } from "../../models/task.model";
import { extractTasks } from "./extract";
import { STORAGE_KEY, TASKS_EVENT_ID } from "./utils";

export function changeTask(
  createdAt: TaskEntityType["createdAt"],
  modify: (task: TaskEntityType) => TaskEntityType
) {
  const tasks = extractTasks();

  const found = tasks.tasks.find(
    (each) => each.createdAt.toISOString() === createdAt.toISOString()
  );

  if (!found) {
    return;
  }

  const modified = modify(found);

  for (const key in found) {
    (found as any)[key] = (modified as any)[key];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  // Fire event for listeners, to re-hydrate components
  document.dispatchEvent(new Event(TASKS_EVENT_ID));
}
