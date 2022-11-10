import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BoardActions from '../../store/board.actions';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  createColumnForm!: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ColumnFormComponent>,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createColumnForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
    });
  }

  onSubmit(): void {
    this.store.dispatch(BoardActions.createColumn(this.createColumnForm.value));
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
