import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from "@angular/common/http";
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AuthActions from './auth.actions'
import { environment } from "../../../environments/environment";
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import * as fromApp from '../../store/app.reducer'

export interface ISignupResponse {
  userId: string,
  name: string,
  login: string
}

export interface ILoginResponse {
  token: string,
  login: string
  userId: string,
  name: string
}

const handleError = (errorRes: any) => {
  let errorMessage = "An unknown error occurred!";
  if (!errorRes.error || !errorRes.status) {
    return of(new AuthActions.LoginFail(errorMessage));
  }
  switch (errorRes.status) {
    case 409:
      errorMessage = "This email exists already!";
      break;
    case 403:
      errorMessage = "User was not founded!";
      break;
  }
  return of(new AuthActions.LoginFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  tokenExpiresIn = 43200;
  // tokenExpiresIn = 10;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  authSignup$ = createEffect(() =>{
    return this.actions$.pipe(
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
          map(()=>{
            return new AuthActions.LoginStart(
              {
                login: signupAction.payload.login, password: signupAction.payload.password
              }
              )
          }),
          catchError((error)=>{
            return handleError(error)
          }),
        )
      })
    )
  })

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
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
            const tokenExpirationDate = new Date(new Date().getTime() + this.tokenExpiresIn * 1000);
            return new AuthActions.LoginSuccess({
              login: resData.login,
              token: resData.token,
              userId: resData.userId,
              tokenExpirationDate: tokenExpirationDate,
              name: resData.name
            });
          }),
          catchError((error)=>{
            return handleError(error)
          })
        )
      })
    )
  })

  autoLogin$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          login: string;
          _userId: string;
          _token: string;
          tokenExpirationDate: string;
          name: string
        } = JSON.parse(localStorage.getItem("currentUser") as string);
        if (!userData) {
          return new AuthActions.Logout();
        }
        const expirationDate = new Date(userData.tokenExpirationDate)
        const loadedUser = new User({
            login: userData.login,
            userId: userData._userId,
            token: userData._token,
            tokenExpirationDate: expirationDate,
            name: userData.name
        });
        if (loadedUser.getUserToken()) {
          const expirationDuration =
            new Date(userData.tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return new AuthActions.LoginSuccess({
            login: loadedUser.login,
            userId: loadedUser.getUserId(),
            token: loadedUser.getUserToken(),
            tokenExpirationDate: new Date(userData.tokenExpirationDate),
            name: loadedUser.name
            // redirect: false,
          });
        }
        return new AuthActions.Logout();
      })
    );
  })

  logout$ = createEffect(()=>{
    return this.actions$.pipe(
      ofType(AuthActions.LOGOUT),
      tap(()=>{
        this.authService.clearLogoutTimer();
        localStorage.removeItem('currentUser');
        this.router.navigate(['/auth'])
      })
    )
  }, { dispatch: false })
}
