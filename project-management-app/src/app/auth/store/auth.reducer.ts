import { User } from '../models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions,
) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      const user = new User({
        login: action.payload.login,
        token: action.payload.token,
        userId: action.payload.userId,
      });
      console.log(`New user ${JSON.stringify(user)}`);
      return {
        ...state,
        authError: null,
        user,
        loading: false,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    default:
      return state;
  }
}