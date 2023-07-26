import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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

  source!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModal,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    private router: Router,
  ) {
    this.message = data.message;
    this.confirmText = data.confirmText;
    this.cancelText = data.cancelText;
    if (this.router.url.indexOf('projects') !== -1) {
      this.source = 'projects';
    } else {
      this.source = 'edit-user';
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
