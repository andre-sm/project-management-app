import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import * as AuthActions from '../store/auth.actions';
import * as EditActions from '../../user/store/edit-user.actions';

@Injectable({ providedIn: 'root' })
export class HandleServerErrors {
  page: string = '';

  alertMessageObj!: {
    default: string;
    400: string;
    401: string;
    403: string;
    404: string;
    409: string;
  };

  constructor(private router: Router, private translate: TranslateService) {}

  handleError = (errorRes: any) => {
    this.translate.get('ERROR_ALERT').subscribe((messageObj) => {
      this.alertMessageObj = messageObj;
    });
    this.router.url.indexOf('auth') !== -1
      ? (this.page = 'auth')
      : (this.page = 'edit');
    let errorMessage = this.alertMessageObj.default;
    if (!errorRes.error || !errorRes.status) {
      if (this.page === 'auth') {
        return of(AuthActions.loginFail({ error: errorMessage }));
      }
      return of(
        EditActions.editUserFail({
          statusCode: errorRes.status,
          message: errorMessage,
        }),
      );
    }
    switch (errorRes.status) {
      case 401:
        errorMessage = this.alertMessageObj['401'];
        break;
      case 409:
        errorMessage = this.alertMessageObj['409'];
        break;
      case 403:
      case 404:
        errorMessage = this.alertMessageObj['403'];
        break;
      case 400:
        errorMessage = this.alertMessageObj['400'];
        break;
      default:
        break;
    }
    if (this.page === 'auth') {
      return of(AuthActions.loginFail({ error: errorMessage }));
    }
    return of(
      EditActions.editUserFail({
        statusCode: errorRes.status,
        message: errorMessage,
      }),
    );
  };
}
