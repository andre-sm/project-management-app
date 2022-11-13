import { createAction, props } from '@ngrx/store';
import { Column, Board, ColumnResponse, User, Task } from '../models';

export const getUsers = createAction('[Users] Get Users');

export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ users: User[] }>(),
);

export const getUsersError = createAction(
  '[Users] Get Users Error',
  props<{ error: string }>(),
);

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

export const setTaskColumnFilter = createAction(
  '[Task] Set Column Filter',
  props<{ filterValue: string }>(),
);

export const setTaskUserFilter = createAction(
  '[Task] Set User Filter',
  props<{ filterValue: string }>(),
);

export const clearTaskFilters = createAction('[Task] Clear User Filters');

export const createTask = createAction(
  '[Task] Create Task',
  props<{
    title: string;
    description: string;
    userId: string;
    columnId: string;
  }>(),
);

export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ newTask: Task }>(),
);

export const createTaskError = createAction(
  '[Task] Create Task Error',
  props<{ error: string }>(),
);
