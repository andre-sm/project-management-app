import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { HandleServerErrors } from 'src/app/shared/handle-server-errors.service';

export interface ISignupResponse {
  userId: string;
  name: string;
  login: string;
}

export interface ILoginResponse {
  token: string;
  login: string;
  userId: string;
  name: string;
}

// const handleError = (errorRes: any) => {
//   let errorMessage = 'An unknown error occurred!';
//   if (!errorRes.error || !errorRes.status) {
//     return of(AuthActions.loginFail({ error: errorMessage }));
//   }
//   switch (errorRes.status) {
//     case 409:
//       errorMessage = 'This email exists already!';
//       break;
//     case 403:
//       errorMessage = 'User was not founded!';
//       break;
//     case 400:
//       errorMessage = 'Password must be a string!';
//       break;
//     default:
//       break;
//   }
//   return of(AuthActions.loginFail({ error: errorMessage }));
// };

@Injectable()
export class AuthEffects {
  tokenExpiresIn = 43200;
  // tokenExpiresIn = 10;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private handleErrorsService: HandleServerErrors
  ) {}

  authSignup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signupStart),
      switchMap(({ name, login, password }) => {
        return this.http
          .post<ISignupResponse>(`${environment.baseUrl}/signup`, {
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
          .post<ILoginResponse>(`${environment.baseUrl}/signin`, {
            login,
            password,
          })
          .pipe(
            map((resData) => {
              const tokenExpirationDate = new Date(
                new Date().getTime() + this.tokenExpiresIn * 1000,
              );
              const newUser = {
                login: resData.login,
                token: resData.token,
                userId: resData.userId,
                tokenExpirationDate,
                name: resData.name,
              }
              localStorage.setItem('currentUser', JSON.stringify(newUser));
              return AuthActions.loginSuccess(newUser);
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
          tokenExpirationDate: string;
          name: string;
        } = JSON.parse(localStorage.getItem('currentUser') as string);
        if (!userData) {
          return AuthActions.logout();
        }
        const expirationDate = new Date(userData.tokenExpirationDate);
        const loadedUser = {
          login: userData.login,
          userId: userData.userId,
          token: userData.token,
          tokenExpirationDate: expirationDate,
          name: userData.name,
        }
        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData.tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return AuthActions.loginSuccess(loadedUser);
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
          this.router.navigate(['/auth']);
        }),
      );
    },
    { dispatch: false },
  );
}
