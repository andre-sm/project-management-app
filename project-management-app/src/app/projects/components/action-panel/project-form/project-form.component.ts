import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ProjectActions from '../../../store/actions/projects.actions';
import { ProjectForm } from '../../../models';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  createProjectForm!: FormGroup;

  formData: ProjectForm;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectForm,
  ) {
    this.formData = { ...data };
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.createProjectForm = new FormGroup({
      title: new FormControl(this.formData.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(64),
      ]),
      description: new FormControl(this.formData.description || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
    });
  }

  onSubmit(): void {
    const { title, description } = this.createProjectForm.value;

    if (this.formData.type === 'edit') {
      this.store.dispatch(
        ProjectActions.updateProject({
          title,
          description,
          id: this.formData.id || '',
        }),
      );
    }

    if (this.formData.type === 'create') {
      this.store.dispatch(ProjectActions.createProject({ title, description }));
    }
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
