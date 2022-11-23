import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProjectsActions from '../../store/projects.actions';
import { Project } from '../../models';
import { selectError, selectIsLoading, selectProjects } from '../../store/projects.selector';
import { ShowAlertService } from 'src/app/shared/services/show-alert.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects$!: Observable<Project[]>;
  errorSub!: Subscription;
  isLoading$: Observable<boolean>

  constructor(private store: Store, private showAlertService: ShowAlertService) {
    this.projects$ = this.store.select(selectProjects);
    this.isLoading$ = this.store.select(selectIsLoading)
    this.errorSub = this.store.select(selectError).pipe(
      tap((data) => {
        if(data) {
          this.showErrorAlert(data);
        } else {
          this.onHandleError()
        }
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getProjects());
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.store.dispatch(ProjectsActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.showAlertService.showAlert(message);
  }
}
