import { IUser } from '../../../shared/models/user.model';

export interface AuthState {
  user: IUser | null;
  errorMessage: string | null;
  loading: boolean;
}
