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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      mergeMap((token) => {
        if (!token) {
          return next.handle(req);
        }
        const cloneReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(cloneReq);
      }),
    );
  }
}
