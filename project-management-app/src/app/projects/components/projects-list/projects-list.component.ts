import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Project } from '../../models';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import * as ProjectActions from '../../store/projects.actions';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  displayedColumns = ['title', 'description', 'actions'];

  @Input() projects!: Project[];

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private translate: TranslateService,
  ) {}

  deleteDialog(event: Event, id: string): void {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.translate
      .get('PROJECTS.projectsList.deleteDialog')
      .subscribe((config) => {
        dialogConfig.data = {
          message: config.message,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
        };
      });

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(ProjectActions.deleteProject({ id }));
      }
    });
  }

  editDialog(event: Event, id: string): void {
    event.stopPropagation();
    const selectedProject = this.projects.find((item) => item._id === id);

    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    this.translate
      .get('PROJECTS.projectsList.editDialog')
      .subscribe((config) => {
        editDialogConfig.data = {
          title: selectedProject?.title,
          description: selectedProject?.description,
          owner: selectedProject?.owner,
          users: selectedProject?.users,
          formTitle: config.formTitle,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
          id,
        };
      });
    this.dialog.open(ProjectFormComponent, editDialogConfig);
  }
}
