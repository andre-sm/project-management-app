import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import { ProjectsState } from './models';
import { Project } from '../models';
import { Task } from '../../project-board/models';

export const selectProjectsState = createFeatureSelector<ProjectsState>(
  fromProjects.featureName,
);

export const selectProjects = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.projects,
);

export const selectTasks = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.tasks,
);

export const selectRenderProjects = createSelector(
  selectProjects,
  selectTasks,
  (projects: Project[], tasks: Task[]) =>
    projects.map((project) => {
      return {
        ...project,
        tasks: tasks.filter((task) => task.boardId === project._id).length,
      };
    }),
);

export const selectProjectsIds = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.projects.map((project) => project._id),
);

export const selectUsers = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.users,
);
