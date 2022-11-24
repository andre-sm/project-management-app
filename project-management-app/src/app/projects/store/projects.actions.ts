import { createAction, props } from '@ngrx/store';
import { Project, User } from '../models';
import { Task } from '../../project-board/models';

export const getProjects = createAction('[Projects] Get Projects');

export const getProjectsSuccess = createAction(
  '[Projects] Get Projects Success',
  props<{ projects: Project[] }>(),
);

export const getProjectsError = createAction(
  '[Projects] Get Projects Error',
  props<{ error: string }>(),
);

export const getProjectsTasksSuccess = createAction(
  '[Projects] Get All Tasks Success',
  props<{ tasks: Task[] }>(),
);

export const getProjectsTasksError = createAction(
  '[Projects] Get All Tasks Error',
  props<{ error: string }>(),
);

export const createProject = createAction(
  '[Projects] Create Project',
  props<{ title: string; description: string; users: Array<string> }>(),
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

export const updateProject = createAction(
  '[Projects] Update Project',
  props<{
    title: string;
    description: string;
    id: string;
    owner: string;
    users: Array<string>;
  }>(),
);

export const updateProjectSuccess = createAction(
  '[Projects] Update Project Success',
  props<{ updatedProject: Project }>(),
);

export const updateProjectError = createAction(
  '[Projects] Update Project Error',
  props<{ error: string }>(),
);

export const getUsers = createAction('[Users] Get Users');

export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: User[] }>(),
);

export const getUsersError = createAction(
  '[Users] Get Users Error',
  props<{ error: string }>(),
);

export const clearError = createAction('[Auth] Clear Error');

export const setViewMode = createAction(
  '[Projects] Set View Mode',
  props<{ view: string }>(),
);
