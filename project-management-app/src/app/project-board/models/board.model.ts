import { Column } from './column.model';

export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}
