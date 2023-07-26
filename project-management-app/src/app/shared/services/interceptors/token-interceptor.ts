import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    let cloneReq = req;
    let storageToken = '';
    if (localStorage.getItem('currentUser')) {
      storageToken = JSON.parse(
        localStorage.getItem('currentUser') as string,
      ).token;
      if (storageToken) {
        cloneReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${storageToken}`,
          },
        });
        return next.handle(cloneReq);
      }
    }
    return next.handle(req);
  }
}
