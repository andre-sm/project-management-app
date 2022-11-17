import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, of, mergeMap, switchMap } from 'rxjs';
import { selectUserId } from 'src/app/store/selectors/auth.selector';
import { Column, Board, Task } from '../models';
import { BoardService } from '../services/board.service';
import * as BoardActions from './board.actions';
import { selectBoardId } from './board.selectors';

@Injectable()
export class BoardEffects {
  getBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoard),
      switchMap(({ id }) => {
        return this.boardService.getBoardById(id).pipe(
          map((board: Board) => BoardActions.getBoardSuccess({ board })),
          catchError((error) =>
            of(BoardActions.getBoardError({ error: error.message })),
          ),
        );
      }),
    );
  });

  getColumns$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoardSuccess),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([, boardId]) => {
        return this.boardService.getColumns(boardId).pipe(
          map((columns: Column[]) =>
            BoardActions.getColumnsSuccess({ columns }),
          ),
          catchError((error) =>
            of(BoardActions.getColumnsError({ error: error.message })),
          ),
        );
      }),
    );
  });

  getTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getColumnsSuccess),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      switchMap(([, boardId]) => {
        return this.boardService.getTasks(boardId).pipe(
          map((tasks: Task[]) => BoardActions.getTasksSuccess({ tasks })),
          catchError((error) =>
            of(BoardActions.getTasksError({ error: error.message })),
          ),
        );
      }),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ title, order }, id]) => {
        return this.boardService.createColumn(title, order, id).pipe(
          map((newColumn: Column) =>
            BoardActions.createColumnSuccess({ newColumn }),
          ),
          catchError((error) =>
            of(BoardActions.createColumnError({ error: error.message })),
          ),
        );
      }),
    );
  });

  deleteColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ id }, boardId]) => {
        return this.boardService.deleteColumn(id, boardId).pipe(
          map(() => BoardActions.deleteColumnSuccess({ id })),
          catchError((error) =>
            of(BoardActions.deleteColumnError({ error: error.message })),
          ),
        );
      }),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ title, id, order }, boardId]) => {
        return this.boardService.updateColumn(title, id, order, boardId).pipe(
          map((updatedColumn) =>
            BoardActions.updateColumnSuccess({ updatedColumn }),
          ),
          catchError((error) =>
            of(BoardActions.updateColumnError({ error: error.message })),
          ),
        );
      }),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createTask),
      concatLatestFrom(() => [
        this.store.select(selectUserId),
        this.store.select(selectBoardId),
      ]),
      mergeMap(
        ([{ title, description, columnId, order, users }, userId, boardId]) => {
          return this.boardService
            .createTask(
              title,
              description,
              columnId,
              order,
              users,
              userId,
              boardId,
            )
            .pipe(
              map((newTask: Task) =>
                BoardActions.createTaskSuccess({ newTask }),
              ),
              catchError((error) =>
                of(BoardActions.createTaskError({ error: error.message })),
              ),
            );
        },
      ),
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateTask),
      concatLatestFrom(() => [
        this.store.select(selectUserId),
        this.store.select(selectBoardId),
      ]),
      mergeMap(
        ([
          { id, title, description, columnId, order, users },
          userId,
          boardId,
        ]) => {
          return this.boardService
            .updateTask(
              id,
              title,
              description,
              columnId,
              order,
              users,
              userId,
              boardId,
            )
            .pipe(
              map((updatedTask) =>
                BoardActions.updateTaskSuccess({ updatedTask }),
              ),
              catchError((error) =>
                of(BoardActions.updateTaskError({ error: error.message })),
              ),
            );
        },
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteTask),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ id, columnId }, boardId]) => {
        return this.boardService.deleteTask(id, columnId, boardId).pipe(
          map(() => BoardActions.deleteTaskSuccess({ id })),
          catchError((error) =>
            of(BoardActions.deleteTaskError({ error: error.message })),
          ),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store,
  ) {}
}
