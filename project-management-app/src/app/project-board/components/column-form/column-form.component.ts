import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as BoardActions from '../../store/board.actions';
import { Column, ColumnForm } from '../../models';
import { Observable, tap } from 'rxjs';
import { selectColumnsWithTasks } from '../../store/board.selectors';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent implements OnInit {
  columnForm!: FormGroup;

  formData: ColumnForm;

  columns$!: Observable<Column[]>;

  columns!: Column[];

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ColumnFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ColumnForm,
  ) {
    this.formData = { ...data };
    this.columns$ = this.store.select(selectColumnsWithTasks);
  }

  ngOnInit(): void {
    this.createForm();
    this.columns$.pipe(
      tap(columns => {
        this.columns = columns;
      })
      ).subscribe()
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
    const { title } = this.columnForm.value;
    if (this.formData.id === null) {
      this.store.dispatch(BoardActions.createColumn({ title }));
    } else {
      this.store.dispatch(
        BoardActions.updateColumn({
          title,
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
