import { TaskStorageEntityType } from "../../models/task-storage.model";
import { extractTasks } from "./extract";
import { STORAGE_KEY, TASKS_EVENT_ID } from "./utils";

export function clearDeletedTasks() {
  const tasks = extractTasks();

  const filteredTasks = tasks.tasks.filter((each) => !each.deleted);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      tasks: filteredTasks,
    } as TaskStorageEntityType)
  );

  // Fire event for listeners, to re-hydrate components
  document.dispatchEvent(new Event(TASKS_EVENT_ID));
}
