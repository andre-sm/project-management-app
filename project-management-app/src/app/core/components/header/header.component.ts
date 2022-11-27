import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TeamCarouselService } from 'src/app/welcome/components/team-carousel/services/team-carousel.service';
import {
  selectIsAuthenticated,
  selectUserName,
} from '../../../store/selectors/auth.selector';
import { ProjectFormComponent } from '../../../projects/components/project-form/project-form.component';
import { Router, Scroll } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated$!: Observable<boolean>;

  userName$!: Observable<string | undefined>;

  initialLang: string | null = null;

  isChecked!: boolean;

  boardIsTrue$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  boardIsTrue: boolean = false;
  boardIsTrueSub!: Subscription;
  routerSub!: Subscription

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private translate: TranslateService,
    private teamCarouselService: TeamCarouselService,
    private router: Router,
    private location: Location
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
    this.boardIsTrueSub = this.boardIsTrue$.subscribe((val)=>{
      this.boardIsTrue = val;
    })

    this.routerSub = router.events.subscribe((val) => {
      if(val instanceof Scroll && this.location.path().indexOf('board') !== -1) {
        this.boardIsTrue$.next(true)
      } else {
        this.boardIsTrue$.next(false)
      }
    })

    this.location.path().indexOf('board') !== -1 ? this.boardIsTrue$.next(true) : this.boardIsTrue$.next(false);
  }

  ngOnDestroy(): void {
    this.boardIsTrueSub.unsubscribe();
    this.routerSub.unsubscribe();
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

  onNavigate() {
    if(this.boardIsTrue) {
      this.boardIsTrue$.next(false)
    }
    this.router.navigate(['/projects'])
  }
}
