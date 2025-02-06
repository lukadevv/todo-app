import {
  TaskStorageEntity,
  TaskStorageEntityType,
} from "../../models/task-storage.model";
import { STORAGE_KEY } from "./utils";

export function extractTasks(): TaskStorageEntityType {
  const rawTasks = localStorage.getItem(STORAGE_KEY);

  if (!rawTasks) {
    // Tasks not exists yet!
    initStorage();

    return {
      tasks: [],
    };
  }

  try {
    const rawTasksAsArray: object = JSON.parse(rawTasks);

    const tasks: TaskStorageEntityType =
      TaskStorageEntity.validateSync(rawTasksAsArray);

    return tasks;
  } catch {
    // Backup after reset it
    backupIt(String(rawTasks));

    // Reset
    initStorage();
  }

  return {
    tasks: [],
  };
}

function initStorage() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ tasks: [] } as TaskStorageEntityType)
  );
}

function backupIt(value: string) {
  localStorage.setItem(`${STORAGE_KEY}_${Date.now()}`, value);
}
