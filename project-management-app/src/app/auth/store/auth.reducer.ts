import { createReducer, on } from '@ngrx/store';
import { User } from '../../shared/models/user.model';
import * as AuthActions from './auth.actions';
import { AuthState } from './models/auth-state.model';

export const featureName = 'authFeature';

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signupStart,
    AuthActions.loginStart,
    (state): AuthState => ({
      ...state,
      authError: null,
      loading: true,
    }),
  ),
  on(AuthActions.loginSuccess, (state, user): AuthState => {
    const newUser = new User({
      login: user.login,
      token: user.token,
      userId: user.userId,
      tokenExpirationDate: user.tokenExpirationDate,
      name: user.name,
    });
    // need to move it to effects
    localStorage.setItem('currentUser', JSON.stringify(user));
    return {
      ...state,
      authError: null,
      loading: false,
      user: newUser,
    };
  }),
  on(
    AuthActions.loginFail,
    (state, { error }): AuthState => ({
      ...state,
      authError: error,
      loading: false,
    }),
  ),
  on(AuthActions.logout, (state): AuthState => {
    return {
      ...state,
      user: null,
    };
  }),
  on(
    AuthActions.clearError,
    (state): AuthState => ({
      ...state,
      authError: null,
    }),
  ),
);
