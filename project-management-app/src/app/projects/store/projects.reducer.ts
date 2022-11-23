import { createReducer, on } from '@ngrx/store';
import * as ProjectActions from './projects.actions';
import { ProjectsState } from './models/projects-state.model';

export const featureName = 'projectsFeature';

export const initialState: ProjectsState = {
  isLoading: false,
  projects: [],
  error: null,
  users: [],
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
  on(ProjectActions.deleteProjectSuccess, (state, { id }): ProjectsState => {
    const updatedProjects = state.projects.filter((item) => item._id !== id);
    return {
      ...state,
      projects: updatedProjects,
    };
  }),
  on(
    ProjectActions.deleteProjectError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
    }),
  ),
  on(
    ProjectActions.updateProjectSuccess,
    (state, { updatedProject }): ProjectsState => {
      const updatedProjects = state.projects.map((item) =>
        item._id === updatedProject._id ? updatedProject : item,
      );
      return {
        ...state,
        projects: updatedProjects,
      };
    },
  ),
  on(
    ProjectActions.updateProjectError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
    }),
  ),
  on(ProjectActions.getUsersSuccess, (state, { users }): ProjectsState => {
    return {
      ...state,
      users,
    };
  }),
  on(
    ProjectActions.getUsersError,
    (state, { error }): ProjectsState => ({
      ...state,
      error,
    }),
  ),
  on(
    ProjectActions.clearError,
    (state): ProjectsState => ({
      ...state,
      error: null
    })
  )
);
