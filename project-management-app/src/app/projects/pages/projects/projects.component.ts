import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { ShowAlertService } from 'src/app/shared/services/show-alert.service';
import * as ProjectsActions from '../../store/projects.actions';
import { ProjectRender } from '../../models';
import {
  selectRenderProjects,
  selectViewMode,
  selectError,
  selectIsLoading,
} from '../../store/projects.selector';
import { HandleViewService } from '../../services/handle-view-on-mobile.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects$!: Observable<ProjectRender[]>;

  errorSub!: Subscription;

  isLoading$: Observable<boolean>;

  view$!: Observable<string>;

  screenSize: number = 0;

  screenSizeSub!: Subscription

  constructor(
    private store: Store,
    private showAlertService: ShowAlertService,
    protected handleViewService: HandleViewService
  ) {
    this.projects$ = this.store.select(selectRenderProjects);
    this.view$ = this.store.select(selectViewMode);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorSub = this.store
      .select(selectError)
      .pipe(
        tap((data) => {
          if (data) {
            this.showErrorAlert(data);
          } else {
            this.onHandleError();
          }
        }),
      )
      .subscribe();
      window.onresize = () => {
        this.screenSize = window.innerWidth;
        this.handleViewService.screenSize$.next(this.screenSize);
      }


  }

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getProjects());
    this.screenSize = window.innerWidth;
    this.handleViewService.screenSize$.next(this.screenSize);
    this.screenSizeSub = this.handleViewService.screenSize$.subscribe(
      (screenSize) => {
        if(screenSize <= 600) {
          this.store.dispatch(ProjectsActions.setViewMode({view: 'grid'}))
        } else {
          this.store.dispatch(ProjectsActions.setViewMode({view: JSON.parse(localStorage.getItem('projectsView') || 'list')}))
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.screenSizeSub.unsubscribe();
  }

  onHandleError() {
    this.store.dispatch(ProjectsActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.showAlertService.showAlert(message);
  }
}
