import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../auth/store/auth.actions';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent {
  @Input() isAuthenticated!: boolean | null;

  constructor(private store: Store) {}

  onLogout() {
    this.store.dispatch(AuthActions.logout({ isAutoLogout: false }));
  }
}
