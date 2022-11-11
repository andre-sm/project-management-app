import { createAction, props } from '@ngrx/store';

export const editUserStart = createAction(
  '[EditUser] Edit User Start',
  props<{ name: string; login: string; password: string; userId: string }>(),
);

export const editUserSuccess = createAction(
  '[EditUser] Edit User Success',
  props<{
    login: string;
    token: string;
    userId: string;
    name: string;
    tokenExpirationDate: Date;
  }>(),
);

export const editUserFail = createAction(
  '[EditUser] Edit User Fail',
  props<{ statusCode: number; message: string }>(),
);

export const deleteUserStart = createAction(
  '[EditUser] Delete User Start',
  props<{ userId: string }>(),
);

export const deleteUserSuccess = createAction('[EditUser] Delete User Success');

export const deleteUserFail = createAction(
  '[EditUser] Delete User Fail',
  props<{ statusCode: number; message: string }>(),
);
