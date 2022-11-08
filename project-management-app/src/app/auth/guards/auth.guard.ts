import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { selectAuthState } from '../../store/selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.select(selectAuthState).pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user) => {
        const isSignedIn = !!user;
        if (isSignedIn) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login']);
      }),
    );
  }
}
