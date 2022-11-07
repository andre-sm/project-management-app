import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModal } from '../../../projects/models';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  message: string;

  confirmText: string;

  cancelText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModal,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
  ) {
    this.message = data.message;
    this.confirmText = data.confirmText;
    this.cancelText = data.cancelText;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
