import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

import { HandleServerErrors } from 'src/app/auth/services/handle-server-errors.service';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import * as ProjectsActions from '../../projects/store/projects.actions';
import * as BoardActions from '../../project-board/store/board.actions';
import { environment } from '../../../environments/environment';

export interface ISignupResponse {
  userId: string;
  name: string;
  login: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IGetUserNameResponse {
  _id: string;
  name: string;
  login: string;
  color: string;
}

@Injectable()
export class AuthEffects {
  endPointAuth = 'auth';

  endPointUsers = 'users';

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private handleErrorsService: HandleServerErrors,
    private store: Store,
  ) {}

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(({ name, login, password, color }) => {
        return this.http
          .post<ISignupResponse>(
            `${environment.baseUrl}/${this.endPointAuth}/signup`,
            {
              name,
              login,
              password,
              color,
            },
          )
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
          .post<ILoginResponse>(
            `${environment.baseUrl}/${this.endPointAuth}/signin`,
            {
              login,
              password,
            },
          )
          .pipe(
            map((resData) => {
              const decoded: {
                id: string;
                login: string;
                exp: number;
                iat: number;
              } = jwt_decode(resData.token);
              const newUser = {
                token: resData.token,
                userId: decoded.id,
                isAutoLogin: false,
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
          color: string;
        } = JSON.parse(localStorage.getItem('currentUser') as string);
        if (!userData) {
          return AuthActions.logout({ isAutoLogout: true });
        }
        const loadedUser = {
          userId: userData.userId,
          token: userData.token,
          isAutoLogin: true,
        };
        if (loadedUser.token) {
          return AuthActions.getUserName(loadedUser);
        }
        return AuthActions.logout({ isAutoLogout: true });
      }),
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(({ isAutoLogout }) => {
          localStorage.removeItem('currentUser');
          if (!isAutoLogout) {
            this.router.navigate(['/welcome']);
          }
          [
            AuthActions.clearError(),
            ProjectsActions.clearError(),
            BoardActions.clearError(),
          ].forEach((action): void => {
            this.store.dispatch(action);
          });
        }),
      );
    },
    { dispatch: false },
  );

  getUserName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.getUserName),
      switchMap(({ token, userId, isAutoLogin }) => {
        return this.http
          .get<IGetUserNameResponse>(
            `${environment.baseUrl}/${this.endPointUsers}/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .pipe(
            map((resData) => {
              const newUser = {
                login: resData.login,
                token,
                userId: resData._id,
                name: resData.name,
                color: resData.color,
                isAutoLogin,
              };
              localStorage.setItem('currentUser', JSON.stringify(newUser));
              return AuthActions.loginSuccess(newUser);
            }),
            catchError((error) => {
              localStorage.removeItem('currentUser');
              this.router.navigate(['/auth/login']);
              return this.handleErrorsService.handleError(error);
            }),
          );
      }),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ isAutoLogin }) => {
          if (!isAutoLogin) {
            this.router.navigate(['/projects']);
          }
          [
            AuthActions.clearError(),
            ProjectsActions.clearError(),
            BoardActions.clearError(),
          ].forEach((action) => {
            this.store.dispatch(action);
          });
        }),
      );
    },
    { dispatch: false },
  );
}
