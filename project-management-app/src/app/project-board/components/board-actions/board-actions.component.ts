import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BoardInfo } from '../../models';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-board-actions',
  templateUrl: './board-actions.component.html',
  styleUrls: ['./board-actions.component.scss'],
})
export class BoardActionsComponent {
  @Input() boardInfo!: BoardInfo;

  @Input() columnsCount!: number | undefined;

  constructor(public dialog: MatDialog, private translate: TranslateService) {}

  openCreateColumnDialog(): void {
    const createDialogConfig = new MatDialogConfig();
    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.projectBoardPage.dialog.createColumn')
      .subscribe((config) => {
        createDialogConfig.data = {
          formTitle: config.formTitle,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
          id: null,
        };
      });

    this.dialog.open(ColumnFormComponent, createDialogConfig);
  }

  openCreateTaskDialog(): void {
    const createDialogConfig = new MatDialogConfig();
    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.projectBoardPage.dialog.createTask')
      .subscribe((config) => {
        createDialogConfig.data = {
          formTitle: config.formTitle,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
          id: null,
        };
      });

    this.dialog.open(TaskFormComponent, createDialogConfig);
  }
}
