import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class HandleErrorsService {
  errorMessage: string = '';

  alertMessageObj!: {
    default: string;
    400: string;
    404: string;
    403: string;
  };

  constructor(private translate: TranslateService) {}

  handleErrorMessage(status: number): string {
    this.translate.get('ERROR_ALERT_PROJECTS').subscribe((messageObj) => {
      this.alertMessageObj = { ...messageObj };
      this.errorMessage = this.alertMessageObj.default;
    });
    switch (status) {
      case 404:
        this.errorMessage = this.alertMessageObj['404'];
        break;
      case 400:
        this.errorMessage = this.alertMessageObj['400'];
        break;
      case 403:
        this.errorMessage = this.alertMessageObj['403'];
        break;
      default:
        break;
    }
    return this.errorMessage;
  }
}
