import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user.model';

export const editUserStart = createAction(
  '[EditUser] Edit User Start',
  props<{ name: string, login: string, password: string }>(),
)

export const editUserSuccess = createAction(
  '[EditUser] Edit User Success',
  props<{ id: string, name: string, login: string }>(),
)

export const editUserFail = createAction(
  '[EditUser] Edit User Fail',
  props<{ statusCode: number, message: string }>(),
)