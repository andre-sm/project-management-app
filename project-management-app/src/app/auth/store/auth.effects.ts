import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';

export interface ISignupResponse {
  userId: string;
  name: string;
  login: string;
}

export interface ILoginResponse {
  token: string;
  login: string;
  userId: string;
}

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  authSignup = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((signupAction: AuthActions.SignupStart) => {
        return this.http
          .post<ISignupResponse>(`${environment.baseUrl}/signup`, {
            name: signupAction.payload.name,
            login: signupAction.payload.login,
            password: signupAction.payload.password,
          })
          .pipe(
            map((resData) => {
              console.log(
                `Res Data from signup effect${JSON.stringify(resData)}`,
              );
              return new AuthActions.LoginStart({
                login: signupAction.payload.login,
                password: signupAction.payload.password,
              });
            }),
            catchError((error) => {
              console.log(error);
              return error;
            }),
          );
      }),
    );
  });

  authLogin = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((signupAction: AuthActions.LoginStart) => {
        return this.http
          .post<ILoginResponse>(`${environment.baseUrl}/signin`, {
            login: signupAction.payload.login,
            password: signupAction.payload.password,
          })
          .pipe(
            map((resData) => {
              console.log(`User: ${signupAction.payload.login} logged in`);
              console.log(
                `Res Data from login effect${JSON.stringify(resData)}`,
              );
              return new AuthActions.LoginSuccess({
                login: resData.login,
                token: resData.token,
                userId: resData.userId,
              });
            }),
            catchError((error) => {
              console.log(error);
              return error;
            }),
          );
      }),
    );
  });
}
