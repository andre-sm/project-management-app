import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent {
  constructor(public dialog: MatDialog, private translate: TranslateService) {}

  openCreateDialog(): void {
    const createDialogConfig = new MatDialogConfig();

    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    this.translate.get('PROJECTS.actionPanel.dialog').subscribe((config) => {
      createDialogConfig.data = {
        formTitle: config.formTitle,
        confirmText: config.confirmText,
        cancelText: config.cancelText,
      };
    });

    this.dialog.open(ProjectFormComponent, createDialogConfig);
  }
}
