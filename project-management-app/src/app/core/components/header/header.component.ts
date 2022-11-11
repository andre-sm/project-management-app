import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';

import { selectAuthState } from '../../../store/selectors/auth.selector';
import * as AuthActions from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;

  private userSub: Subscription | undefined;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select(selectAuthState)
      .pipe(
        map((authState) => {
          return authState.user;
        }),
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSignup() {
    this.router.navigate(['/auth/signup']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  onEditUser() {
    this.router.navigate(['/edit-user']);
  }
}
