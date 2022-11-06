import { UserState } from './user-state.model';

export interface AuthState {
  user: UserState | null;
  authError: string | null;
  loading: boolean;
}
