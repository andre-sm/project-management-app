import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BoardActions from '../../store/board.actions';
import { Column, ColumnForm } from '../../models';
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

  colors: string[] = ['#49c385', '#63baff', '#fcd347', '#4f30e5'];

  selectedColor = '';

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

    this.selectedColor = this.formData.color;
    this.columnForm.patchValue({
      color: this.formData.color,
    });
  }

  createForm(): void {
    this.columnForm = new FormGroup({
      title: new FormControl(this.formData.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
      color: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const { title, color } = this.columnForm.value;
    if (this.formData.id === null) {
      this.store.dispatch(BoardActions.createColumn({ title, color }));
    } else {
      this.store.dispatch(
        BoardActions.updateColumn({
          title,
          color,
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
