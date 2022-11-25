import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProjects from './projects.reducer';
import { ProjectsState } from './models';
import { Project, User } from '../models';
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
export const selectRenderProjects = createSelector(
  selectProjects,
  selectTasks,
  selectUsers,
  (projects: Project[], tasks: Task[], allUsers: User[]) =>
    projects.map((project) => {
      const owner = allUsers.find((user) => user._id === project.owner);
      return {
        ...project,
        tasks: tasks.filter((task) => task.boardId === project._id).length,
        ownerData: {
          name: owner ? owner.name : '',
          color: owner ? owner.color : '',
        },
      };
    }),
);

export const selectProjectsIds = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.projects.map((project) => project._id),
);

export const selectViewMode = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.view,
);
