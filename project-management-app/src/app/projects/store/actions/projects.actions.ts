import { createAction, props } from '@ngrx/store';
import { CreateProject, Project } from '../../models';

export const createProject = createAction(
  '[Projects] Create Project',
  props<{ formData: CreateProject }>(),
);

export const createProjectSuccess = createAction(
  '[Projects] Create Project Success',
  props<{ newProject: Project }>(),
);

export const createProjectError = createAction(
  '[Projects] Create Project Error',
  props<{ error: string }>(),
);
