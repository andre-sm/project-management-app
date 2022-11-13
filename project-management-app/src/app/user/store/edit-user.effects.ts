import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HandleServerErrors } from 'src/app/shared/services/handle-server-errors.service';
import { Store } from '@ngrx/store';
import * as EditActions from './edit-user.actions';
import * as AuthActions from '../../auth/store/auth.actions';
import { environment } from '../../../environments/environment';

export interface IEditResponse {
  id: string;
  name: string;
  login: string;
}

@Injectable()
export class EditEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private handleErrorsService: HandleServerErrors,
    private store: Store,
  ) {}

  editStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditActions.editUserStart),
      switchMap(({ name, login, password, userId }) => {
        return this.http
          .put<IEditResponse>(`${environment.baseUrl}/users/${userId}`, {
            name,
            login,
            password,
          })
          .pipe(
            map((data) => {
              const oldUser = JSON.parse(
                localStorage.getItem('currentUser') as string,
              );
              const updatedUser = {
                name: data.name,
                login: data.login,
                userId: data.id,
                token: oldUser.token as string,
                tokenExpirationDate: oldUser.tokenExpirationDate as Date,
              };
              localStorage.setItem('currentUser', JSON.stringify(updatedUser));
              return EditActions.editUserSuccess(updatedUser);
            }),
            catchError((error) => {
              return this.handleErrorsService.handleError(error);
            }),
          );
      }),
    );
  });

  deleteUserStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditActions.deleteUserStart),
      switchMap(({ userId }) => {
        return this.http.delete(`${environment.baseUrl}/users/${userId}`).pipe(
          map(() => {
            return EditActions.deleteUserSuccess();
          }),
          catchError((error) => {
            return of(EditActions.deleteUserFail(error));
          }),
        );
      }),
    );
  });

  deleteUserSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditActions.deleteUserSuccess),
      switchMap(() => {
        return of(AuthActions.logout());
      }),
    );
  });

  deleteUserFail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditActions.deleteUserFail),
      switchMap((error) => {
        return this.handleErrorsService.handleError(error);
      }),
    );
  });
}