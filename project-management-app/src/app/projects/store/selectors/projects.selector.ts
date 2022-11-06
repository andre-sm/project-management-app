import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from '../reducers/projects.reducer';
import { ProjectsState } from '../models';
import { Project } from '../../models/project.model';

export const selectProjectsState = createFeatureSelector<ProjectsState>(
  fromProjects.featureName,
);

export const selectProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.projects,
);

export const selectSelectedProject = (id: string) =>
  createSelector(selectProjects, (projects) =>
    projects.find((project: Project) => project.id === id),
  );
