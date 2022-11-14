import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { selectUser } from '../../../store/selectors/auth.selector';
import * as AuthActions from '../../../auth/store/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated = false;
  initialLang: string | null = null;

  constructor(private store: Store, private router: Router, private translate: TranslateService) {
    this.store.select(selectUser).pipe(
      tap((user) => {
        this.isAuthenticated = !!user;
      })
    ).subscribe();
    if(localStorage.getItem('lang')) {
      this.initialLang = localStorage.getItem('lang')
    }
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
  }

  onEditUser() {
    this.router.navigate(['/edit-user']);
  }

  onChangeLanguage(toggleLangGroup: MatButtonToggleGroup) {
    this.translate.use(toggleLangGroup.value);
    localStorage.setItem('lang', toggleLangGroup.value);
  }
}
