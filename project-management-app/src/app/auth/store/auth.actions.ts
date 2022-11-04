import { Action } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login Start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP_SUCCESS = '[Auth] Signup Success';
export const SIGNUP_FAIL = '[Auth] Signup Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout'
export const CLEAR_ERROR = "[Auth] Clear Error";

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { login: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(
    public payload: {
      login: string;
      token: string;
      userId: string;
      tokenExpirationDate: Date;
      name: string
    },
  ) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(
    public payload: { name: string; login: string; password: string },
  ) {}
}

export class SignupSuccess implements Action {
  readonly type = SIGNUP_SUCCESS;

  constructor(
    public payload: {
      userId: string;
      name: string;
      login: string;
    },
  ) {}
}

export class SignupFail implements Action {
  readonly type = LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | LoginStart
  | LoginFail
  | LoginSuccess
  | SignupStart
  | SignupFail
  | Logout
  | ClearError;
