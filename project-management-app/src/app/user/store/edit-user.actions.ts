import { createAction, props } from '@ngrx/store';

export const editUserStart = createAction(
  '[EditUser] Edit User Start',
  props<{ name: string, login: string, password: string, userId: string }>(),
);

export const editUserSuccess = createAction(
  '[EditUser] Edit User Success',
  props<{ id: string; name: string; login: string }>(),
);

export const editUserFail = createAction(
  '[EditUser] Edit User Fail',
  props<{ statusCode: number; message: string }>(),
);
