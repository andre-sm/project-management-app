import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import { ProjectsState } from './models';
import { state } from '@angular/animations';

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

export const selectError = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.error
)

export const selectIsLoading = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.isLoading
)
