import { createSelector, createFeatureSelector } from '@ngrx/store';
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
  (state: BoardFeatureState) => state.board.columns,
);
