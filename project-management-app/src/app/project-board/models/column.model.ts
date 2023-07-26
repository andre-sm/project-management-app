import { Task } from './task.model';

export interface Column {
  _id: string;
  title: string;
  color: string;
  order: number;
  boardId: string;
  tasks: Task[];
}
