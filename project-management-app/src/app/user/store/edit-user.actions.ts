import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.model';

export const editUserStart = createAction(
  '[EditUser] Edit User Start',
  props<{ name: string, login: string, password: string, userId: string }>(),
);

export const editUserSuccess = createAction(
  '[EditUser] Edit User Success',
  props<IUser>(),
);

export const editUserFail = createAction(
  '[EditUser] Edit User Fail',
  props<{ statusCode: number; message: string }>(),
);
