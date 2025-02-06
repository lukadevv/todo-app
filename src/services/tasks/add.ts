import { TaskEntityType } from "../../models/task.model";
import { extractTasks } from "./extract";
import { STORAGE_KEY, TASKS_EVENT_ID } from "./utils";

export type AddTaskParamsType = Pick<
  TaskEntityType,
  "project" | "description" | "priority"
>;

export function addTask({ project, description, priority }: AddTaskParamsType) {
  const tasks = extractTasks();

  tasks.tasks.push({
    project,
    description,
    createdAt: new Date(),
    deleted: false,
    done: false,
    priority,
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  // Fire event for listeners, to re-hydrate components
  document.dispatchEvent(new Event(TASKS_EVENT_ID));
}
