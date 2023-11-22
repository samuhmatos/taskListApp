export interface Task {
  id: string;
  title: string;
}

export interface TaskService {
  tasks: Task[];
  selectedTask: Task;
  add: (task: Omit<Task, "id">) => void;
  remove: (taskId: string) => void;
  update: (task: Task) => void;
  select: (taskId: string) => void;
}
