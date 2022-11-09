import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ login: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<User>(),
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>(),
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ name: string; login: string; password: string }>(),
);

export const autoLogin = createAction('[Auth] Auto Login');

export const logout = createAction('[Auth] Logout');

export const clearError = createAction('[Auth] Clear Error');
