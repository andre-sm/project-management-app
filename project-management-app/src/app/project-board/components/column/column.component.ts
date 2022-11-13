import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Column } from '../../models';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import * as BoardActions from '../../store/board.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column!: Column;

  constructor(public dialog: MatDialog, private store: Store, private translate: TranslateService) {}

  editDialog(): void {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    this.translate.get('PROJECT_BOARD.column.editDialog').subscribe((config) => {
      editDialogConfig.data = {
        title: this.column.title,
        id: this.column.id,
        order: this.column.order,
        formTitle: config.formTitle,
        confirmText: config.confirmText,
        cancelText: config.cancelText,
      };
    });

    this.dialog.open(ColumnFormComponent, editDialogConfig);
  }

  deleteDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.translate.get('PROJECT_BOARD.column.deleteDialog').subscribe((config) => {
      dialogConfig.data = {
        message: config.message,
        confirmText: config.confirmText,
        cancelText: config.cancelText,
    };
    })

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(BoardActions.deleteColumn({ id: this.column.id }));
      }
    });
  }
}
