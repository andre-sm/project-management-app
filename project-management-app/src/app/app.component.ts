import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(private store: Store, private translate: TranslateService) {
    translate.setDefaultLang('en');
    const lang = localStorage.getItem('lang');
    if (lang) {
      translate.use(lang);
    }
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
