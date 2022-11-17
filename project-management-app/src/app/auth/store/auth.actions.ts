import { createAction, props } from '@ngrx/store';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ login: string; password: string }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{
    login: string;
    token: string;
    userId: string;
    name: string;
  }>(),
);

export const loginFail = createAction(
  '[Auth] Login Fail',
  props<{ error: string }>(),
);

export const signupStart = createAction(
  '[Auth] Signup Start',
  props<{ name: string; login: string; password: string }>(),
);

export const getUserName = createAction(
  '[Auth] Get User Name',
  props<{
    token: string;
    userId: string;
  }>(),
);

export const autoLogin = createAction('[Auth] Auto Login');

export const logout = createAction('[Auth] Logout');

export const clearError = createAction('[Auth] Clear Error');
