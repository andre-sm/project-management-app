import { createAction, props } from '@ngrx/store';
import { CreateProject, Project } from '../../models';

export const getProjects = createAction('[Projects] Get Projects');

export const getProjectsSuccess = createAction(
  '[Projects] Get Projects Success',
  props<{ projects: Project[] }>(),
);

export const getProjectsError = createAction(
  '[Projects] Get Projects Error',
  props<{ error: string }>(),
);

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

export const deleteProject = createAction(
  '[Projects] Delete Project',
  props<{ id: string }>(),
);

export const deleteProjectSuccess = createAction(
  '[Projects] Delete Project Success',
  props<{ id: string }>(),
);

export const deleteProjectError = createAction(
  '[Projects] Delete Project Error',
  props<{ error: string }>(),
);
