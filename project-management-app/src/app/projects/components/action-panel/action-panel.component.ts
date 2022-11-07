import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent {
  constructor(public dialog: MatDialog) {}

  openCreateDialog(): void {
    const createDialogConfig = new MatDialogConfig();

    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    createDialogConfig.data = {
      formTitle: 'Create project',
      confirmText: 'Create',
      cancelText: 'Close',
      id: null,
    };

    this.dialog.open(ProjectFormComponent, createDialogConfig);
  }
}
