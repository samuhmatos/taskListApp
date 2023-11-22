import { utils } from "../../utils/utils";
import { Task } from "./taskTypes";
export const mock: Task[] = [
  {
    id: utils.uuid(),
    title: "Pagar as contas de luz",
  },
  {
    id: utils.uuid(),
    title: "Levar o dog para passear",
  },
];
