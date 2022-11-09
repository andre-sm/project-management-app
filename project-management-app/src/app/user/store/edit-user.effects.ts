import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as EditActions from './edit-user.actions';
import { environment } from '../../../environments/environment';

export interface IEditResponse {
  userId: string;
  name: string;
  login: string;
}

@Injectable()
export class EditEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
  ) {}

  editStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EditActions.editUserStart),
      switchMap(({ name, login, password, userId }) => {
        return this.http.put<IEditResponse>(`${environment.baseUrl}/users/${userId}`, {
          name,
          login,
          password
        })
        .pipe(
          map(() => {
            return EditActions.editUserSuccess({
              id: userId,
              name,
              login
            })
          }),
          catchError((error) => {
            return of(error)
          })
        )
      })
    )
  })

}
