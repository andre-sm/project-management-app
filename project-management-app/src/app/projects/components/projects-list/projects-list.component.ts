import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../models';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { ProjectFormComponent } from '../action-panel/project-form/project-form.component';
import * as ProjectActions from '../../store/actions/projects.actions';
import { selectSelectedProject } from '../../store/selectors/projects.selector';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnDestroy {
  displayedColumns = ['title', 'description', 'actions'];

  selectedProject$!: Observable<Project | undefined>;

  selectedProjectSub!: Subscription;

  @Input() projects!: Project[];

  constructor(public dialog: MatDialog, private store: Store) {}

  deleteDialog(id: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you want to delete project?',
      confirmText: 'Yes',
      cancelText: 'No',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(ProjectActions.deleteProject({ id }));
      }
    });
  }

  editDialog(id: string): void {
    const editDialogConfig = new MatDialogConfig();

    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;

    this.selectedProject$ = this.store.select(selectSelectedProject(id));
    this.selectedProjectSub = this.selectedProject$.subscribe(
      (data: Project | undefined) => {
        editDialogConfig.data = {
          title: data?.title,
          description: data?.description,
          formTitle: 'Edit project',
          confirmText: 'Edit',
          cancelText: 'Close',
          type: 'edit',
          id,
        };
      },
    );

    this.dialog.open(ProjectFormComponent, editDialogConfig);
  }

  ngOnDestroy() {
    this.selectedProjectSub.unsubscribe();
  }
}
