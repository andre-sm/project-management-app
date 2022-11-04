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
        tokenExpirationDate: action.payload.tokenExpirationDate,
        name: action.payload.name,
      });
      localStorage.setItem('currentUser', JSON.stringify(user));
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
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case AuthActions.LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
