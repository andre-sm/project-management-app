import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TeamCarouselService } from 'src/app/welcome/components/team-carousel/services/team-carousel.service';
import {
  selectIsAuthenticated,
  selectUserName,
} from '../../../store/selectors/auth.selector';
import { ProjectFormComponent } from '../../../projects/components/project-form/project-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuthenticated$!: Observable<boolean>;

  userName$!: Observable<string | undefined>;

  initialLang: string | null = null;

  isChecked!: boolean;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private translate: TranslateService,
    private teamCarouselService: TeamCarouselService,
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userName$ = this.store.select(selectUserName);

    if (localStorage.getItem('lang')) {
      this.initialLang = localStorage.getItem('lang');
      this.initialLang === 'en'
        ? (this.isChecked = true)
        : (this.isChecked = false);
      if (this.initialLang) {
        this.teamCarouselService.languageChanged$.next();
      }
    } else {
      this.isChecked = true;
    }
  }

  onLanguageChange() {
    this.isChecked = !this.isChecked;
    const language = this.isChecked ? 'en' : 'ru';
    this.translate.use(language);
    localStorage.setItem('lang', language);
    this.teamCarouselService.languageChanged$.next();
  }

  openCreateProjectDialog(): void {
    const createDialogConfig = new MatDialogConfig();

    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    this.translate.get('PROJECTS.actionPanel.dialog').subscribe((config) => {
      createDialogConfig.data = {
        formTitle: config.formTitle,
        confirmText: config.confirmText,
        cancelText: config.cancelText,
        id: null,
      };
    });

    this.dialog.open(ProjectFormComponent, createDialogConfig);
  }
}
