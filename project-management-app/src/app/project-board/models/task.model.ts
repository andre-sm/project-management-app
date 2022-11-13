import { File } from './file.model';

export interface Task {
  id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  files: File[];
  boardId?: string;
  columnId?: string;
}
