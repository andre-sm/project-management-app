import { createAction, props } from '@ngrx/store';
import { Column, Board, Task, TaskSet } from '../models';

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

export const getColumnsSuccess = createAction(
  '[Columns] Get Columns Success',
  props<{ columns: Column[] }>(),
);

export const getColumnsError = createAction(
  '[Columns] Get Columns Error',
  props<{ error: string }>(),
);

export const createColumn = createAction(
  '[Column] Create Column',
  props<{ title: string; color: string; order: number }>(),
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
  props<{ title: string; color: string; id: string; order: number | null }>(),
);

export const updateColumnSuccess = createAction(
  '[Column] Update Column Success',
  props<{ updatedColumn: Column }>(),
);

export const updateColumnError = createAction(
  '[Column] Update Column Error',
  props<{ error: string }>(),
);

export const setTaskColumnFilter = createAction(
  '[Task] Set Column Filter',
  props<{ filterValue: string }>(),
);

export const clearTaskFilters = createAction('[Task] Clear User Filters');

export const getTasksSuccess = createAction(
  '[Task] Get Tasks Success',
  props<{ tasks: Task[] }>(),
);

export const getTasksError = createAction(
  '[Task] Get Tasks Error',
  props<{ error: string }>(),
);

export const createTask = createAction(
  '[Task] Create Task',
  props<{
    title: string;
    description: string;
    columnId: string;
    users: string[];
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

export const updateTask = createAction(
  '[Task] Update Task',
  props<{
    id: string;
    title: string;
    description: string;
    columnId: string;
    order: number;
    users: string[];
  }>(),
);

export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ updatedTask: Task }>(),
);

export const updateTaskError = createAction(
  '[Task] Update Task Error',
  props<{ error: string }>(),
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string; columnId: string }>(),
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>(),
);

export const deleteTaskError = createAction(
  '[Task] Delete Task Error',
  props<{ error: string }>(),
);

export const updateTasksSet = createAction(
  '[TasksSet] Update Tasks Set',
  props<{ tasks: TaskSet[] }>(),
);

export const updateTasksSetSuccess = createAction(
  '[TasksSet] Update Tasks Set Success',
  props<{ updatedTasks: Task[] }>(),
);

export const updateTasksSetError = createAction(
  '[TasksSet] Update Tasks Set Error',
  props<{ error: string }>(),
);
