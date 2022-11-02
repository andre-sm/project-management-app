import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from "@angular/common/http";
import { catchError, map, switchMap } from 'rxjs';

import * as AuthActions from './auth.actions'
import { environment } from "../../../environments/environment";
import { Injectable } from '@angular/core';

export interface ISignupResponse {
  id: string,
  name: string,
  login: string
}

export interface ILoginResponse {
  token: string
}

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<ISignupResponse>(
        `${environment.baseUrl}/signup`,
        {
          name: signupAction.payload.name,
          login: signupAction.payload.login,
          password: signupAction.payload.password
        }
      )
      .pipe(
        map((resData)=>{
          return new AuthActions.LoginStart(
            {
              login: signupAction.payload.login, password: signupAction.payload.password
            }
            )
        }),
        catchError((error)=>{
          console.log(error)
          return error
        }),
      )
    })
  )

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((signupAction: AuthActions.LoginStart) => {
      return this.http.post<ILoginResponse>(
        `${environment.baseUrl}/signin`,
        {
          login: signupAction.payload.login,
          password: signupAction.payload.password
        }
      )
      .pipe(
        map((resData)=>{
          console.log(`User: ${signupAction.payload.login} logged in`)
          return new AuthActions.LoginSuccess({login: signupAction.payload.login, token: resData.token})
        }),
        catchError((error)=>{
          console.log(error)
          return error
        })
      )
    })
  )


}
