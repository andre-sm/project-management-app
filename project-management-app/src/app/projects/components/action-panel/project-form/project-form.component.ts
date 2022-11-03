import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ProjectActions from '../../../store/actions/projects.actions';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  createProjectForm!: FormGroup;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.createProjectForm = new FormGroup({
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
    });
  }

  onSubmit(): void {
    this.store.dispatch(
      ProjectActions.createProject(this.createProjectForm.value),
    );
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
