import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
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
    const selectedProject = this.projects.find((item) => item.id === id);

    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = {
      title: selectedProject?.title,
      description: selectedProject?.description,
      formTitle: 'Edit project',
      confirmText: 'Save',
      cancelText: 'Close',
      id,
    };

    this.dialog.open(ProjectFormComponent, editDialogConfig);
  }
}
