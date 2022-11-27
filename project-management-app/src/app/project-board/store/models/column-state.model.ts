export interface ColumnState {
  id: string;
  title: string;
  order: number | null;
  tasks: {
    id: string;
    title: string;
    description: string;
    order: number | null;
    userId: string;
    files: {
      filename: string;
      fileSize: number | null;
    };
  };
}
