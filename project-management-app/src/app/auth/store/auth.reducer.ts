import { createReducer, on } from '@ngrx/store';
import { AuthState } from './models/auth-state.model';
import * as AuthActions from './auth.actions';
import * as EditActions from '../../user/store/edit-user.actions';

export const featureName = 'authFeature';

const initialState: AuthState = {
  user: null,
  errorMessage: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.signupStart,
    AuthActions.loginStart,
    EditActions.editUserStart,
    EditActions.deleteUserStart,
    (state): AuthState => ({
      ...state,
      errorMessage: null,
      loading: true,
    }),
  ),
  on(AuthActions.loginSuccess, (state, user): AuthState => {
    return {
      ...state,
      errorMessage: null,
      loading: false,
      user,
    };
  }),
  on(AuthActions.loginFail, (state, { error }): AuthState => {
    return {
      ...state,
      errorMessage: error,
      loading: false,
    };
  }),
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
      errorMessage: null,
    }),
  ),
  on(
    EditActions.editUserSuccess,
    (state, updatedUser): AuthState => ({
      ...state,
      loading: false,
      user: { ...updatedUser },
    }),
  ),
  on(
    EditActions.deleteUserSuccess,
    (state): AuthState => ({
      ...state,
      loading: false,
    })
  ),
  on(
    EditActions.editUserFail,
    EditActions.deleteUserFail,
    (state, errorObj): AuthState => ({
      ...state,
      loading: false,
      errorMessage: errorObj.message,
    }),
  ),
);
