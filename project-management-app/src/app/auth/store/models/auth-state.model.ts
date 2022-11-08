import { User } from 'src/app/shared/models/user.model';

export interface AuthState {
  user: User | null;
  authError: string | null;
  loading: boolean;
}
