import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(ProjectFormComponent, {
      autoFocus: true,
      disableClose: true,
    });
  }
}
