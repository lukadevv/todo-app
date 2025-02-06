import * as yup from "yup";

export type TaskEntityType = yup.InferType<typeof TaskEntity>;
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export const TaskEntity = yup
  .object({
    project: yup
      .string()
      .transform((value: string) => value.toLowerCase())
      .required(),
    description: yup.string().required(),
    done: yup.boolean().default(false).required(),
    priority: yup
      .string()
      .oneOf<TaskPriority>(["LOW", "MEDIUM", "HIGH"])
      .required(),
    createdAt: yup
      .date()
      .default(() => new Date())
      .required(),
    deleted: yup.boolean().default(false),
  })
  .required();
