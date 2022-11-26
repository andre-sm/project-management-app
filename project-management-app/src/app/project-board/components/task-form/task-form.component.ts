import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Column, TaskForm } from '../../models';
import { User } from '../../../projects/models';
import * as BoardActions from '../../store/board.actions';
import {
  selectColumnsTitles,
  selectFilteredColumns,
} from '../../store/board.selectors';
import { selectUsers } from '../../../projects/store/projects.selector';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;

  taskData!: TaskForm;

  columnsArr!: string[];

  columns$!: Observable<Column[]>;

  users$!: Observable<User[]>;

  selectedColumnId: string;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskForm,
  ) {
    this.taskData = { ...data };
    this.selectedColumnId = this.taskData?.columnData?.columnId || '';
  }

  ngOnInit(): void {
    this.store.select(selectColumnsTitles).subscribe((arr) => {
      if (!this.columnsArr) {
        this.columnsArr = arr;
      }
    });

    this.createForm();

    this.columns$ = this.store.select(selectFilteredColumns);
    this.users$ = this.store.select(selectUsers);

    this.onColumnInputChange();

    this.taskForm.patchValue({
      users: this.taskData.users,
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(BoardActions.clearTaskFilters());
  }

  createForm(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(this.taskData?.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      description: new FormControl(this.taskData?.description || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      column: new FormControl(this.taskData?.columnData?.title || '', [
        Validators.required,
        this.columnValidator.bind(this),
      ]),
      users: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const { title, description, users } = this.taskForm.value;

    if (this.taskData.id === null) {
      this.store.dispatch(
        BoardActions.createTask({
          title,
          description,
          columnId: this.selectedColumnId,
          users,
        }),
      );
    } else {
      this.store.dispatch(
        BoardActions.updateTask({
          id: this.taskData.id,
          title,
          description,
          columnId: this.selectedColumnId,
          order: this.taskData.order,
          users,
        }),
      );
    }

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

  onColumnChange(columnId: string, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.selectedColumnId = columnId;
    }
  }

  columnValidator(control: FormControl): ValidationErrors | null {
    if (control.value) {
      if (!this.columnsArr.includes(control.value)) {
        return { columnError: true };
      }
    }
    return null;
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  get formControl() {
    return this.taskForm.controls;
  }
}
