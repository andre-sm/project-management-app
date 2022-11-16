import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

import { HandleServerErrors } from 'src/app/shared/services/handle-server-errors.service';
import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

export interface ISignupResponse {
  userId: string;
  name: string;
  login: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IGetUserNameResponse {
  _id: string,
  name: string,
  login: string
}

@Injectable()
export class AuthEffects {
  endPointAuth = 'auth';
  endPointUsers = 'users'

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private handleErrorsService: HandleServerErrors,
  ) {}

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(({ name, login, password }) => {
        return this.http
          .post<ISignupResponse>(`${environment.baseUrl}/${this.endPointAuth}/signup`, {
            name,
            login,
            password,
          })
          .pipe(
            map(() => {
              return AuthActions.loginStart({
                login,
                password,
              });
            }),
            catchError((error) => {
              return this.handleErrorsService.handleError(error);
            }),
          );
      }),
    );
  });

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStart),
      switchMap(({ login, password }) => {
        return this.http
          .post<ILoginResponse>(`${environment.baseUrl}/${this.endPointAuth}/signin`, {
            login,
            password,
          })
          .pipe(
            map((resData) => {
              const decoded: {
                id: string,
                login: string,
                exp: number,
                iat: number
              } = jwt_decode(resData.token)
              const newUser = {
                token: resData.token,
                userId: decoded.id,
              };
              return AuthActions.getUserName(newUser);
            }),
            catchError((error) => {
              return this.handleErrorsService.handleError(error);
            }),
          );
      }),
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.autoLogin),
      map(() => {
        const userData: {
          login: string;
          userId: string;
          token: string;
          name: string;
        } = JSON.parse(localStorage.getItem('currentUser') as string);
        if (!userData) {
          return AuthActions.logout();
        }
        const loadedUser = {
          userId: userData.userId,
          token: userData.token,
        };
        if (loadedUser.token) {
          return AuthActions.getUserName(loadedUser);
        }
        return AuthActions.logout();
      }),
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('currentUser');
          this.router.navigate(['/welcome']);
        }),
      );
    },
    { dispatch: false },
  );

  getUserName$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.getUserName),
        switchMap(({token, userId}) => {
          return this.http.get<IGetUserNameResponse>(`${environment.baseUrl}/${this.endPointUsers}/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).pipe(
            map((resData) => {
              const newUser = {
                login: resData.login,
                token: token,
                userId: resData._id,
                name: resData.name
              }
              localStorage.setItem('currentUser', JSON.stringify(newUser));
              this.router.navigate(['/projects']);
              return AuthActions.loginSuccess(newUser)
            }),
            catchError((error) => {
              localStorage.removeItem('currentUser');
              this.router.navigate(['/auth/login']);
              return this.handleErrorsService.handleError(error);
            })
          )
        })
      )
    }
  )
}
