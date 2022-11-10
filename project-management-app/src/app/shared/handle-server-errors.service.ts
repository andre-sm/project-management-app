import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of} from 'rxjs';
import * as AuthActions from '../auth/store/auth.actions';
import * as EditActions from '../user/store/edit-user.actions';

@Injectable({providedIn: 'root'})
export class HandleServerErrors {

  page: string = ''

  constructor(private router: Router) {}

  handleError = (errorRes: any) => {
    (this.router.url.indexOf('auth') !== -1) ? this.page = 'auth' : 'edit'
    let errorMessage = 'An unknown error occurred!';
    if ((!errorRes.error || !errorRes.status)) {
      if(this.page === 'auth') {
        return of(AuthActions.loginFail({ error: errorMessage }));
      } else {
        return of(EditActions.editUserFail({
          statusCode: errorRes.status,
          message: errorMessage
          }));
      }
    }
    switch (errorRes.status) {
      case 409:
        errorMessage = 'This email exists already!';
        break;
      case 403:
        errorMessage = 'User was not founded!';
        break;
      case 400:
        errorMessage = 'Password must be a string!';
        break;
      default:
        break;
    }
    if(this.page === 'auth') {
      return of(AuthActions.loginFail({ error: errorMessage }));
    } else {
      return of(EditActions.editUserFail({
        statusCode: errorRes.status,
        message: errorMessage
        }));
    }
  };
}
