import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BoardActions from '../../store/board.actions';
import { ColumnForm } from '../../models';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  columnForm!: FormGroup;

  formData: ColumnForm;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ColumnFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnForm,
  ) {
    this.formData = { ...data };
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.columnForm = new FormGroup({
      title: new FormControl(this.formData.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
    });
  }

  onSubmit(): void {
    if (this.formData.id === null) {
      this.store.dispatch(BoardActions.createColumn(this.columnForm.value));
    } else {
      this.store.dispatch(
        BoardActions.updateColumn({
          title: this.columnForm.value.title,
          id: this.formData.id,
          order: this.formData.order,
        }),
      );
    }
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
