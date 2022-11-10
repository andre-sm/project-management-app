import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { BoardFeatureState } from './models';

export const featureName = 'boardFeature';

export const initialState: BoardFeatureState = {
  isLoading: false,
  error: null,
  board: {
    info: {
      id: '',
      title: '',
      description: '',
    },
    columns: [],
  },
};

export const projectsReducer = createReducer(
  initialState,
  on(BoardActions.getBoardSuccess, (state, { board }): BoardFeatureState => {
    return {
      ...state,
      board: {
        info: {
          id: board.id,
          title: board.title,
          description: board.description,
        },
        columns: board.columns,
      },
    };
  }),
  on(
    BoardActions.getBoardError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.createColumnSuccess,
    (state, { newColumn }): BoardFeatureState => {
      const column = { ...newColumn, tasks: [] };
      return {
        ...state,
        board: {
          ...state.board,
          columns: [...state.board.columns, column],
        },
      };
    },
  ),
  on(
    BoardActions.createColumnError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
);
