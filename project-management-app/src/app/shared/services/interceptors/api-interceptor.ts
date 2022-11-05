import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { mergeMap, Observable } from 'rxjs';
import { selectToken } from '../../../store/selectors/auth.selector';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      mergeMap((token) => {
        const cloneReq = req.clone({
          url: `${environment.baseUrl}${req.url}`,
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(cloneReq);
      }),
    );
  }
}
