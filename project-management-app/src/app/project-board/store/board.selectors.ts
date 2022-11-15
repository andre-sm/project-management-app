import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Column, User } from '../models';
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

export const selectBoardColumns = createSelector(
  selectBoardState,
  (state: BoardFeatureState) =>
    [...state.board.columns]
      .map((column) => {
        return {
          ...column,
          tasks: [...column.tasks].sort(
            (taskA, taskB) => taskA.order - taskB.order,
          ),
        };
      })
      .sort((columnA, columnB) => columnA.order - columnB.order),
);

export const selectUsers = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.users,
);

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

export const selectTaskUserFilter = createSelector(
  selectBoardState,
  (state: BoardFeatureState) => state.taskUserFilter,
);

export const selectFilteredUsers = createSelector(
  selectUsers,
  selectTaskUserFilter,
  (users: User[], value: string) =>
    users.filter((user) => user.name.toLowerCase().includes(value)),
);
