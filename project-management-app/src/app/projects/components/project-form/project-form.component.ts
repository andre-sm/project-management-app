import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as ProjectsActions from '../../store/projects.actions';
import { ProjectForm, User } from '../../models';
import { selectUsers } from '../../store/projects.selector';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;

  formData: ProjectForm;

  users$!: Observable<User[]>;

  constructor(
    private store: Store,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProjectForm,
  ) {
    this.formData = { ...data };
  }

  ngOnInit(): void {
    this.createForm();

    this.projectForm.patchValue({
      users: this.formData.users,
    });
    this.users$ = this.store.select(selectUsers);
  }

  createForm(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(this.formData.title || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(32),
      ]),
      description: new FormControl(this.formData.description || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255),
      ]),
      users: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    const { title, description, users } = this.projectForm.value;

    if (this.formData.id === null) {
      this.store.dispatch(
        ProjectsActions.createProject({ title, description, users }),
      );
    } else {
      this.store.dispatch(
        ProjectsActions.updateProject({
          title,
          description,
          id: this.formData.id,
          owner: this.formData.owner,
          users,
        }),
      );
    }
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get title() {
    return this.projectForm.get('title');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get users() {
    return this.projectForm.get('users');
  }
}
