import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../../auth/store/auth.actions';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit {
  @Input() isAuthenticated!: boolean | null;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  onClick() {
    console.log(this.isAuthenticated);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout({ isAutoLogout: false }));
  }
}
