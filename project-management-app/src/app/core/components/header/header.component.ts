import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';

import { selectUser } from '../../../store/selectors/auth.selector';
import * as AuthActions from '../../../auth/store/auth.actions';
import { TeamCarouselService } from 'src/app/welcome/components/team-carousel/services/team-carousel.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated = false;
  initialLang: string | null = null;

  constructor(private store: Store, private router: Router, private translate: TranslateService, private teamCarouselService: TeamCarouselService) {
    this.store.select(selectUser).pipe(
      tap((user) => {
        this.isAuthenticated = !!user;
      })
    ).subscribe();
    if(localStorage.getItem('lang')) {
      this.initialLang = localStorage.getItem('lang');
      if(this.initialLang) {
        this.teamCarouselService.languageChanged$.next();
      }
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
    this.teamCarouselService.languageChanged$.next();
  }
}
