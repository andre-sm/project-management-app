import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Column, TaskForm, User } from '../../models';
import * as BoardActions from '../../store/board.actions';
import {
  selectFilteredColumns,
  selectFilteredUsers,
} from '../../store/board.selectors';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;

  formData!: TaskForm;

  columns$!: Observable<Column[]>;

  users$!: Observable<User[]>;

  selectedColumnId: string = '';

  selectedUserId: string = '';

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm,
  ) {
    this.formData = { ...data };
  }

  ngOnInit(): void {
    this.store.dispatch(BoardActions.getUsers());
    this.createForm();

    this.columns$ = this.store.select(selectFilteredColumns);
    this.users$ = this.store.select(selectFilteredUsers);

    this.onColumnInputChange();
    this.onUserInputChange();
  }

  ngOnDestroy(): void {
    this.store.dispatch(BoardActions.clearTaskFilters());
  }

  createForm(): void {
    this.taskForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      column: new FormControl('', [Validators.required]),
      user: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    this.store.dispatch(
      BoardActions.createTask({
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        userId: this.selectedUserId,
        columnId: this.selectedColumnId,
      }),
    );
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onColumnInputChange(): void {
    this.taskForm.controls['column'].valueChanges
      .pipe(
        map((value) => value.trim().toLowerCase()),
        distinctUntilChanged(),
      )
      .subscribe((value) =>
        this.store.dispatch(
          BoardActions.setTaskColumnFilter({ filterValue: value }),
        ),
      );
  }

  onUserInputChange(): void {
    this.taskForm.controls['user'].valueChanges
      .pipe(
        map((value) => value.trim().toLowerCase()),
        distinctUntilChanged(),
      )
      .subscribe((value) =>
        this.store.dispatch(
          BoardActions.setTaskUserFilter({ filterValue: value }),
        ),
      );
  }

  onColumnChange(columnId: string, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.selectedColumnId = columnId;
    }
  }

  onUserChange(userId: string, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.selectedUserId = userId;
    }
  }
}
