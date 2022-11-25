import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, of, mergeMap, switchMap } from 'rxjs';
import { HandleErrorsService } from 'src/app/shared/services/handle-error.service';
import { selectUserId } from 'src/app/store/selectors/auth.selector';
import { Column, Board, Task } from '../models';
import { BoardService } from '../services/board.service';
import * as BoardActions from './board.actions';
import { selectBoardId, selectNextTaskOrder } from './board.selectors';

@Injectable()
export class BoardEffects {
  getBoardById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.getBoard),
      switchMap(({ id }) => {
        return this.boardService.getBoardById(id).pipe(
          map((board: Board) => BoardActions.getBoardSuccess({ board })),
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(BoardActions.getBoardError({ error: errorMessage }));
          }),
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
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(BoardActions.getColumnsError({ error: errorMessage }));
          }),
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
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(BoardActions.getTasksError({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ title, color, order }, id]) => {
        return this.boardService.createColumn(title, color, order, id).pipe(
          map((newColumn: Column) =>
            BoardActions.createColumnSuccess({ newColumn }),
          ),
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(BoardActions.createColumnError({ error: errorMessage }));
          }),
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
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(BoardActions.deleteColumnError({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  updateColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ title, color, id, order }, boardId]) => {
        return this.boardService
          .updateColumn(title, color, id, order, boardId)
          .pipe(
            map((updatedColumn) =>
              BoardActions.updateColumnSuccess({ updatedColumn }),
            ),
            catchError((error) => {
              const errorMessage = this.handleErrorsService.handleErrorMessage(
                error.status,
              );
              return of(
                BoardActions.updateColumnError({ error: errorMessage }),
              );
            }),
          );
      }),
    );
  });

  createTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createTask),
      concatLatestFrom((action) => [
        this.store.select(selectNextTaskOrder(action.columnId)),
        this.store.select(selectUserId),
        this.store.select(selectBoardId),
      ]),
      mergeMap(
        ([{ title, description, columnId, users }, order, userId, boardId]) => {
          return this.boardService
            .createTask(
              title,
              description,
              columnId,
              users,
              order,
              userId,
              boardId,
            )
            .pipe(
              map((newTask: Task) =>
                BoardActions.createTaskSuccess({ newTask }),
              ),
              catchError((error) => {
                const errorMessage =
                  this.handleErrorsService.handleErrorMessage(error.status);
                return of(
                  BoardActions.createTaskError({ error: errorMessage }),
                );
              }),
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
              catchError((error) => {
                const errorMessage =
                  this.handleErrorsService.handleErrorMessage(error.status);
                return of(
                  BoardActions.updateTaskError({ error: errorMessage }),
                );
              }),
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
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(BoardActions.deleteTaskError({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  updateTasksSet$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.updateTasksSet),
      mergeMap(({ tasks }) => {
        return this.boardService.updateTasksSet(tasks).pipe(
          map((updatedTasks) =>
            BoardActions.updateTasksSetSuccess({ updatedTasks }),
          ),
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(
              BoardActions.updateTasksSetError({ error: errorMessage }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store,
    private handleErrorsService: HandleErrorsService,
  ) {}
}
