import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as AuthActions from '../../../../auth/store/auth.actions';
import {
  selectAvatarColor,
  selectUserName,
} from '../../../../store/selectors/auth.selector';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
})
export class LoginMenuComponent implements OnDestroy {
  @Input() isAuthenticated!: boolean | null;

  avatarColor$: Observable<string | undefined>;

  avatarInitials$: Subscription;

  avatarInitials: string = '';

  constructor(private router: Router, private store: Store) {
    this.avatarColor$ = this.store.select(selectAvatarColor);
    this.avatarInitials$ = this.store
      .select(selectUserName)
      .subscribe((data) => {
        this.avatarInitials = data as string;
      });
  }

  onLogin() {
    this.router.navigate(['/auth/login']);
  }

  onSignup() {
    this.router.navigate(['/auth/signup']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout({ isAutoLogout: false }));
  }

  onEditUser() {
    this.router.navigate(['/edit-user']);
  }

  ngOnDestroy(): void {
    this.avatarInitials$.unsubscribe();
  }
}
