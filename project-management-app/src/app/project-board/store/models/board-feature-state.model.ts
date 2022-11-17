import { Column } from '../../models';

export interface BoardFeatureState {
  isLoading: boolean;
  error: string | null;
  board: {
    info: {
      id: string;
      title: string;
      description: string;
      owner: string;
      users: Array<string>;
    };
    columns: Column[];
  };
}
