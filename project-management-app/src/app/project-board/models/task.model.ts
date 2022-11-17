export interface Task {
  _id: string;
  title: string;
  description: string;
  order: number;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}
