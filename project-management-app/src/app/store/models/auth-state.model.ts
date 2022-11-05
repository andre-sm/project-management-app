import { UserState } from './user-state.model';

export interface AuthState {
  user: UserState;
  authError: string | null;
  loading: boolean;
}
