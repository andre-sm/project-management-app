import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as EditActions from './edit-user.actions';
import { environment } from '../../../environments/environment';
import { HandleServerErrors } from 'src/app/shared/handle-server-errors.service';

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
    private handleErrorsService: HandleServerErrors
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
          map((data) => {
            const oldUser = JSON.parse(localStorage.getItem('currentUser') as string)
            const updatedUser = {
              name: data.name,
              login: data.login,
              userId: data.id,
              token: oldUser.token as string,
              tokenExpirationDate: oldUser.tokenExpirationDate as Date
            }
            localStorage.setItem('currentUser', JSON.stringify(updatedUser))
            return EditActions.editUserSuccess(updatedUser)
          }),
          catchError((error) => {
            return this.handleErrorsService.handleError(error)
          })
        )
      })
    )
  })
}
