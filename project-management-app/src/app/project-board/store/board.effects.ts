import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, catchError, of, mergeMap, switchMap } from 'rxjs';
import { Column, Board } from '../models';
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

  createColumn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BoardActions.createColumn),
      concatLatestFrom(() => this.store.select(selectBoardId)),
      mergeMap(([{ title }, id]) => {
        return this.boardService.createColumn(title, id).pipe(
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
            of(BoardActions.deleteColumnError({ error: error.message })),
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
