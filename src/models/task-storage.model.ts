import * as yup from "yup";
import { TaskEntity } from "./task.model";

export type TaskStorageEntityType = yup.InferType<typeof TaskStorageEntity>;

export const TaskStorageEntity = yup.object({
  tasks: yup.array().of(TaskEntity).default([]).required(),
});
