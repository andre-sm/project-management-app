import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Column, Task, ColumnSet } from '../models';
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

export const selectBoardColumnsIds = createSelector(
  selectBoardColumns,
  (columns: Column[]) => {
    return columns.map((column) => column._id);
  },
);

export const selectNextColumnOrder = createSelector(
  selectBoardColumns,
  (columns: Column[]) => {
    return columns.length === 0
      ? 0
      : Math.max(...columns.map((column) => column.order)) + 1;
  },
);

export const selectNewColumnOrder = (index: number) =>
  createSelector(
    selectBoardColumns,
    (columns: Column[]): ColumnSet[] | null => {
      if (index !== columns.length - 1) {
        return columns.slice(index + 1).map((item) => {
          return {
            _id: item._id,
            order: item.order - 1,
          };
        });
      }
      return null;
    },
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

export const selectError = createSelector(
  selectBoardState,
  (state) => state.error,
);

export const selectIsLoading = createSelector(
  selectBoardState,
  (state) => state.isLoading,
);
