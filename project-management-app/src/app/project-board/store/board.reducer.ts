import { createReducer, on } from '@ngrx/store';
import { Column } from '../models';
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
      owner: '',
      users: [],
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
        ...state.board,
        info: {
          id: board._id,
          title: board.title,
          description: board.description,
          owner: board.owner,
          users: board.users,
        },
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
    BoardActions.getColumnsSuccess,
    (state, { columns }): BoardFeatureState => {
      return {
        ...state,
        board: {
          ...state.board,
          columns,
        },
      };
    },
  ),
  on(
    BoardActions.getColumnsError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.createColumnSuccess,
    (state, { newColumn }): BoardFeatureState => {
      return {
        ...state,
        board: {
          ...state.board,
          columns: [...state.board.columns, newColumn],
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
  on(BoardActions.deleteColumnSuccess, (state, { id }): BoardFeatureState => {
    const updatedColumns = state.board.columns.filter(
      (item) => item._id !== id,
    );
    return {
      ...state,
      board: {
        ...state.board,
        columns: updatedColumns,
      },
    };
  }),
  on(
    BoardActions.deleteColumnError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.updateColumnSuccess,
    (state, { updatedColumn }): BoardFeatureState => {
      const updatedColumns = state.board.columns.map((item): Column => {
        if (item._id === updatedColumn._id) {
          return {
            ...item,
            title: updatedColumn.title,
            order: updatedColumn.order,
            boardId: updatedColumn.boardId,
          };
        }
        return item;
      });
      return {
        ...state,
        board: {
          ...state.board,
          columns: updatedColumns,
        },
      };
    },
  ),
  on(
    BoardActions.updateColumnError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
);
