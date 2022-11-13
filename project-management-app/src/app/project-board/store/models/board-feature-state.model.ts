import { Column, User } from '../../models';

export interface BoardFeatureState {
  isLoading: boolean;
  error: string | null;
  board: {
    info: {
      id: string;
      title: string;
      description: string;
    };
    columns: Column[];
  };
  users: User[];
  taskColumnFilter: string;
  taskUserFilter: string;
}
