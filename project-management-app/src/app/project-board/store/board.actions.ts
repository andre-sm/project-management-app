import { createAction, props } from '@ngrx/store';
import { Column, Board, ColumnResponse } from '../models';

export const getBoard = createAction(
  '[Board] Get Board',
  props<{ id: string }>(),
);

export const getBoardSuccess = createAction(
  '[Board] Get Board Success',
  props<{ board: Board }>(),
);

export const getBoardError = createAction(
  '[Board] Get Board Error',
  props<{ error: string }>(),
);

export const createColumn = createAction(
  '[Column] Create Column',
  props<{ title: string }>(),
);

export const createColumnSuccess = createAction(
  '[Column] Create Column Success',
  props<{ newColumn: Column }>(),
);

export const createColumnError = createAction(
  '[Column] Create Column Error',
  props<{ error: string }>(),
);

export const deleteColumn = createAction(
  '[Column] Delete Column',
  props<{ id: string }>(),
);

export const deleteColumnSuccess = createAction(
  '[Column] Delete Column Success',
  props<{ id: string }>(),
);

export const deleteColumnError = createAction(
  '[Column] Delete Column Error',
  props<{ error: string }>(),
);

export const updateColumn = createAction(
  '[Column] Update Column',
  props<{ title: string; id: string; order: number | null }>(),
);

export const updateColumnSuccess = createAction(
  '[Column] Update Column Success',
  props<{ updatedColumn: ColumnResponse }>(),
);

export const updateColumnError = createAction(
  '[Column] Update Column Error',
  props<{ error: string }>(),
);
