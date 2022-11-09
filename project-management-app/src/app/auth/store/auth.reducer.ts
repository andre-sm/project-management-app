import { createReducer, on } from '@ngrx/store';
import { AuthState } from './models/auth-state.model';
import * as AuthActions from './auth.actions';

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
    return {
      ...state,
      authError: null,
      loading: false,
      user: user,
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
