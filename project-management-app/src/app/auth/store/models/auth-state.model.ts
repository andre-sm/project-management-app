import { IUser } from '../../../shared/models/user.model';

export interface AuthState {
  user: IUser | null;
  authError: string | null;
  loading: boolean;
}
