import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../../../../auth/store/auth.actions';
import { Observable } from 'rxjs';
import { selectAvatarColor } from '../../../../store/selectors/auth.selector'

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.scss'],
})
export class LoginMenuComponent {
  @Input() isAuthenticated!: boolean | null;
  avatarColor$: Observable<string | undefined>

  constructor(private router: Router, private store: Store) {
    this.avatarColor$ = this.store.select(selectAvatarColor);
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
}
