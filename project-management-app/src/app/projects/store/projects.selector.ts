import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import { ProjectsState } from './models';

export const selectProjectsState = createFeatureSelector<ProjectsState>(
  fromProjects.featureName,
);

export const selectProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.projects,
);

export const selectUsers = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.users,
);
