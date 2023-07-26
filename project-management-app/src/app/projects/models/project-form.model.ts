export interface ProjectForm {
  formTitle: string;
  confirmText: string;
  cancelText: string;
  title?: string;
  description?: string;
  id: string | null;
  owner: string;
  users: Array<string>;
}
