import { createContext, useEffect, useState } from "react";

import { Task, TaskService } from "../taskTypes";
import { mock } from "../mock";
import { utils } from "../../../utils/utils";
import { storageUtils } from "../../../utils/storage/storageUtils";

export const TaskContext = createContext<TaskService>({
  tasks: [],
  selectedTask: null,
  add: () => {},
  remove: () => {},
  update: () => {},
  select: () => {},
});

export function TaskProvider({ children }: React.PropsWithChildren<{}>) {
  const [tasks, setTasks] = useState<Task[]>(mock);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function add(task: Omit<Task, "id">) {
    const newTask = {
      ...task,
      id: utils.uuid(),
    };
    setTasks((list) => {
      let taskList = [...list, newTask];

      (async () => {
        await storageUtils.set("@taskList:tasks", taskList);
      })();

      return taskList;
    });
    setSelectedTask(null);
  }

  function remove(taskId: string) {
    setTasks(() => {
      let restTaskList = tasks.filter((task) => task.id !== taskId);

      (async () => {
        await storageUtils.set("@taskList:tasks", restTaskList);
      })();

      return restTaskList;
    });
  }

  function update(task: Task) {
    const updatedList = tasks.map((item) =>
      item.id === task.id ? task : item
    );

    setTasks(() => {
      (async () => {
        await storageUtils.set("@taskList:tasks", updatedList);
      })();

      return updatedList;
    });
    setSelectedTask(null);
  }

  function select(taskId: string) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  }

  useEffect(() => {
    (async () => {
      const data = await storageUtils.getOne<Task[]>("@taskList:tasks");

      if (data.length) setTasks(data);
    })();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        add,
        remove,
        update,
        select,
        selectedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
