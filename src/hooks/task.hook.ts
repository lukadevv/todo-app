import { useCallback, useContext, useMemo } from "preact/hooks";
import { TaskEntityType } from "../models/task.model";
import {
  AddTaskParamsType,
  addTask as service_addTask,
} from "../services/tasks/add";
import { TaskContext } from "../providers/task.provider";

export function useTasks() {
  const { tasks } = useContext(TaskContext);
  const projects: TaskEntityType["project"][] = useMemo(
    () =>
      tasks.reduce((array, each) => {
        if (!array.includes(each.project)) {
          array.push(each.project);
        }

        return array;
      }, [] as string[]),
    [tasks]
  );

  const addTask = useCallback(
    (task: AddTaskParamsType) => service_addTask(task),
    []
  );

  return {
    tasks,
    addTask,
    projects,
  };
}
