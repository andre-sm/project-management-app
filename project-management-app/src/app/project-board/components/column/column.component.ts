import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Column } from '../../models';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import * as BoardActions from '../../store/board.actions';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;

  constructor(public dialog: MatDialog, private store: Store) {}

  editDialog(): void {
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

  deleteDialog(): void {
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
}
