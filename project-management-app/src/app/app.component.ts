import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';

import * as AuthActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management-app';

  constructor(private store: Store, public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('ru');
  }

  ngOnInit() {
    this.store.dispatch(AuthActions.autoLogin());
  }
}
