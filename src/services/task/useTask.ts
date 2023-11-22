import { useContext } from "react";
import { TaskService } from "./taskTypes";
import { TaskContext } from "./providers/TaskProvider";

export function useTask(): TaskService {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
}
