import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { TeamCarouselService } from 'src/app/welcome/components/team-carousel/services/team-carousel.service';
import { selectIsAuthenticated } from '../../../store/selectors/auth.selector';
import * as AuthActions from '../../../auth/store/auth.actions';
import { TaskFormComponent } from '../../../project-board/components/task-form/task-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated$!: Observable<boolean>;

  initialLang: string | null = null;

  constructor(
    private store: Store,
    private router: Router,
    public dialog: MatDialog,
    private translate: TranslateService,
    private teamCarouselService: TeamCarouselService,
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);

    if (localStorage.getItem('lang')) {
      this.initialLang = localStorage.getItem('lang');
      if (this.initialLang) {
        this.teamCarouselService.languageChanged$.next();
      }
    }
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

  openCreateTaskDialog(): void {
    const createDialogConfig = new MatDialogConfig();
    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    createDialogConfig.data = {
      formTitle: 'Create task',
      confirmText: 'Create',
      cancelText: 'Close',
      id: null,
    };

    this.dialog.open(TaskFormComponent, createDialogConfig);
  }

  onChangeLanguage(toggleLangGroup: MatButtonToggleGroup) {
    this.translate.use(toggleLangGroup.value);
    localStorage.setItem('lang', toggleLangGroup.value);
    this.teamCarouselService.languageChanged$.next();
  }
}
