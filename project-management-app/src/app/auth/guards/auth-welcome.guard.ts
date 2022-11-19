import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, take } from 'rxjs';
import { selectAuthState } from '../../store/selectors/auth.selector';
import * as AuthActions from '../store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthWelcomeGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  getFromStoreOrAPI(): Observable<any> {
    return this.store
      .select(selectAuthState).pipe(
        take(1),
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
    return this.store.select(selectAuthState).pipe(
      // take(1),
      // map((authState) => {
      //   console.log('AuthWelcomeGuard', authState.user)
      //   return authState.user;
      // }),
      // map((user) => {
      //   const isSignedIn = !!user;
      //   if (!isSignedIn) {
      //     return true;
      //   }
      //   return this.router.createUrlTree(['/projects']);
      // }),
      switchMap(()=>{
        if(localStorage.getItem('currentUser')) {
          console.log('AuthWelcomeGuard')
          this.router.navigate(['/projects'])
          return of(false)
        };
        return of(true)
      }),
    );
    // return this.getFromStoreOrAPI().pipe(
    //   switchMap(()=>of(true)),
    //   catchError(() => of(false))
    // )
  }
}
// this.router.createUrlTree(['/projects'])
