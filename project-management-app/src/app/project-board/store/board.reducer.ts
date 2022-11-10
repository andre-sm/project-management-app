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
  on(BoardActions.deleteColumnSuccess, (state, { id }): BoardFeatureState => {
    const updatedColumns = state.board.columns.filter((item) => item.id !== id);
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
        if (item.id === updatedColumn.id) {
          return {
            ...item,
            title: updatedColumn.title,
            order: updatedColumn.order,
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
