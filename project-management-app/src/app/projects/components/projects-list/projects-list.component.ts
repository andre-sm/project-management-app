import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Project } from '../../models';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import * as ProjectActions from '../../store/actions/projects.actions';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent {
  displayedColumns = ['title', 'description', 'actions'];

  @Input() projects!: Project[];

  constructor(public dialog: MatDialog, private store: Store) {}

  openDialog(id: string): void {
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
}
