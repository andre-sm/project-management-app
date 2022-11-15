import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Column, Task } from '../../models';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import * as BoardActions from '../../store/board.actions';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;

  constructor(public dialog: MatDialog, private store: Store) {}

  editColumnDialog(): void {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = {
      title: this.column.title,
      formTitle: 'Edit column',
      confirmText: 'Save',
      cancelText: 'Close',
      id: this.column.id,
      order: this.column.order,
    };

    this.dialog.open(ColumnFormComponent, editDialogConfig);
  }

  deleteColumnDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you want to delete column?',
      confirmText: 'Yes',
      cancelText: 'No',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(BoardActions.deleteColumn({ id: this.column.id }));
      }
    });
  }

  editTaskDialog(task: Task): void {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    editDialogConfig.data = {
      formTitle: 'Edit task',
      confirmText: 'Save',
      cancelText: 'Close',
      id: task.id,
      order: task.order,
      title: task.title,
      description: task.description,
      userId: task.userId,
      columnData: { id: this.column.id, title: this.column.title },
    };

    this.dialog.open(TaskFormComponent, editDialogConfig);
  }

  deleteTaskDialog(task: Task): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      message: 'Are you want to delete the task?',
      confirmText: 'Yes',
      cancelText: 'No',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(
          BoardActions.deleteTask({ id: task.id, columnId: this.column.id }),
        );
      }
    });
  }
}
