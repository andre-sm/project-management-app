import { Task } from './task.model';

export interface Column {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks: Task[];
}
