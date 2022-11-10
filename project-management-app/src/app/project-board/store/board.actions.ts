import { createAction, props } from '@ngrx/store';
import { Column, Board } from '../models';

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
