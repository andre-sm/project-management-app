import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from '../actions/projects.actions';
import { ProjectsState } from '../models/projects-state.model';

export const featureName = 'projectsFeature';

export const initialState: ProjectsState = {
  isLoading: false,
  projects: [],
  error: null,
};

export const projectsReducer = createReducer(
  initialState,
  on(
    ProjectActions.getProjects,
    (state): ProjectsState => ({
      ...state,
      isLoading: true,
      projects: [],
    }),
  ),
  on(
    ProjectActions.getProjectsSuccess,
    (state, { projects }): ProjectsState => ({
      ...state,
      projects,
      isLoading: false,
    }),
  ),
  on(
    ProjectActions.getProjectsError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
  on(
    ProjectActions.createProject,
    (state): ProjectsState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    ProjectActions.createProjectSuccess,
    (state, { newProject }): ProjectsState => ({
      ...state,
      projects: [...state.projects, newProject],
      isLoading: false,
    }),
  ),
  on(
    ProjectActions.createProjectError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
  on(
    ProjectActions.deleteProject,
    (state): ProjectsState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(ProjectActions.deleteProjectSuccess, (state, { id }): ProjectsState => {
    const updatedProjects = state.projects.filter((item) => item.id !== id);
    return {
      ...state,
      projects: updatedProjects,
      isLoading: false,
    };
  }),
  on(
    ProjectActions.deleteProjectError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
);
