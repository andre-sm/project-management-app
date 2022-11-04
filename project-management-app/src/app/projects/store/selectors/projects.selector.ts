import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from '../reducers/projects.reducer';
import { ProjectsState } from '../models';

export const selectProjectsState = createFeatureSelector<ProjectsState>(
  fromProjects.featureName,
);

export const selectProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.projects,
);
