import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { selectAuthState } from '../../store/selectors/auth.selector';
import * as AuthActions from '../store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthMainGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  getFromStoreOrAPI(): Observable<any> {
    return this.store
      .select(selectAuthState).pipe(
        map((authState) => {
          if(!authState.user) {
            this.store.dispatch(AuthActions.autoLogin());
          }
        }),
        take(1)
      )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.getFromStoreOrAPI().pipe(
      switchMap(()=>{
        if(!localStorage.getItem('currentUser')) {
          this.router.navigate(['/welcome'])
          return of(false)
        };
        return of(true)
      }),
      catchError(() => of(false))
    )
  }
}
