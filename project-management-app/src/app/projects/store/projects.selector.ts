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
  (state: ProjectsState) => state.error,
);

export const selectIsLoading = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.isLoading,
);
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

export const selectSearchTask = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.searchTask,
);

export const selectGlobalSearchValue = createSelector(
  selectProjectsState,
  (state: ProjectsState) => state.globalSearch,
);

export const selectSearchResult = createSelector(
  selectTasks,
  selectGlobalSearchValue,
  selectUsers,
  (tasks: Task[], searchVal, allUsers: User[]) => {
    if (searchVal) {
      const search = searchVal.toLowerCase();
      const newArr = tasks.map((el) => {
        return {
          ...el,
          users: el.users.map((item) => {
            return {
              id: item,
              name: allUsers.find((single) => single._id === item)?.name || '',
            };
          }),
        };
      });

      const modifiedTasks = newArr.filter(
        (task) =>
          task._id.toLowerCase().includes(search) ||
          task.title.toLowerCase().includes(search) ||
          task.users.find((user) => user.name.toLowerCase().includes(search)) ||
          task.description.toLowerCase().includes(search),
      );
      return modifiedTasks;
    }
    return undefined;
  },
);
