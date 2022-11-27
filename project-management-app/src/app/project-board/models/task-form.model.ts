export interface TaskForm {
  formTitle: string;
  confirmText: string;
  cancelText: string;
  id: string | null;
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
  columnData: { columnId: string; title: string };
}
