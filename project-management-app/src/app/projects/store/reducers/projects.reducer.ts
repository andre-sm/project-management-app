import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from '../actions/projects.actions';
import { ProjectsState } from '../models/projects-state.model';

export const initialState: ProjectsState = {
  projects: [],
  error: null,
};

export const projectsReducer = createReducer(
  initialState,
  on(
    ProjectActions.createProjectSuccess,
    (state, { newProject }): ProjectsState => ({
      ...state,
      projects: [...state.projects, newProject],
    }),
  ),
  on(
    ProjectActions.createProjectError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
    }),
  ),
);
