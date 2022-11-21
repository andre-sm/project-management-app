import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Column, Task } from '../models';
import * as fromBoard from './board.reducer';
import { BoardFeatureState } from './models';

export const selectBoardState = createFeatureSelector<BoardFeatureState>(
  fromBoard.featureName,
);

export const selectBoardId = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.board.info.id,
);

export const selectBoardInfo = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.board.info,
);

export const selectTasks = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.board.tasks,
);

export const selectColumnsIds = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.board.columns.map((column) => column._id),
);

export const selectBoardColumns = createSelector(
  selectBoardState,
  (state: BoardFeatureState) =>
    [...state.board.columns].sort(
      (columnA, columnB) => columnA.order - columnB.order,
    ),
);

export const selectColumnsWithTasks = createSelector(
  selectTasks,
  selectBoardColumns,
  (tasks: Task[], columns: Column[]) =>
    columns.map((column) => {
      return {
        ...column,
        tasks: tasks
          .filter((task) => task.columnId === column._id)
          .sort((taskA, taskB) => taskA.order - taskB.order),
      };
    }),
);

export const selectNextTaskOrder = (columnId: string) =>
  createSelector(selectColumnsWithTasks, (columns: Column[]) => {
    const taskCount = columns.find((column) => column._id === columnId)?.tasks
      .length;
    if (taskCount !== undefined) {
      return taskCount === 0 ? 0 : taskCount;
    }
    return undefined;
  });

export const selectTaskColumnFilter = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.taskColumnFilter,
);

export const selectFilteredColumns = createSelector(
  selectBoardColumns,
  selectTaskColumnFilter,
  (columns: Column[], value: string) =>
    columns.filter((column) => column.title.toLowerCase().includes(value)),
);

export const selectColumnsTitles = createSelector(
  selectBoardColumns,
  (columns: Column[]) => columns.map((column) => column.title),
);
