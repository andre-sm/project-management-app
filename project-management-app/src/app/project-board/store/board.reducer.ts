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
    tasks: [],
  },
  taskColumnFilter: '',
  mainTaskFilter: '',
};

export const projectsReducer = createReducer(
  initialState,
  on(
    BoardActions.getBoard,
    (state): BoardFeatureState => ({
      ...state,
      isLoading: true,
      board: {
        info: {
          id: '',
          title: '',
          description: '',
          owner: '',
          users: [],
        },
        columns: [],
        tasks: [],
      },
      taskColumnFilter: '',
    }),
  ),
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
      isLoading: false,
    };
  }),
  on(
    BoardActions.getBoardError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
      isLoading: false,
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
  on(BoardActions.getTasksSuccess, (state, { tasks }): BoardFeatureState => {
    return {
      ...state,
      board: {
        ...state.board,
        tasks,
      },
    };
  }),
  on(
    BoardActions.getTasksError,
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
            color: updatedColumn.color,
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
  on(
    BoardActions.updateColumnsSetSuccess,
    (state, { updatedColumns }): BoardFeatureState => {
      return {
        ...state,
        board: {
          ...state.board,
          columns: state.board.columns.map((column) => {
            const updated = updatedColumns.find(
              (updatedColumn) => column._id === updatedColumn._id,
            );
            return updated || column;
          }),
        },
      };
    },
  ),
  on(
    BoardActions.updateColumnsSetError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.setTaskColumnFilter,
    (state, { filterValue }): BoardFeatureState => ({
      ...state,
      taskColumnFilter: filterValue,
    }),
  ),
  on(
    BoardActions.setMainTaskFilter,
    (state, { filterValue }): BoardFeatureState => ({
      ...state,
      mainTaskFilter: filterValue,
    }),
  ),
  on(
    BoardActions.clearTaskFilters,
    (state): BoardFeatureState => ({
      ...state,
      taskColumnFilter: '',
    }),
  ),
  on(
    BoardActions.createTaskSuccess,
    (state, { newTask }): BoardFeatureState => {
      return {
        ...state,
        board: {
          ...state.board,
          tasks: [...state.board.tasks, newTask],
        },
      };
    },
  ),
  on(
    BoardActions.createTaskError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.updateTaskSuccess,
    (state, { updatedTask }): BoardFeatureState => {
      return {
        ...state,
        board: {
          ...state.board,
          tasks: state.board.tasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task,
          ),
        },
      };
    },
  ),
  on(
    BoardActions.updateTaskError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(BoardActions.deleteTaskSuccess, (state, { id }): BoardFeatureState => {
    return {
      ...state,
      board: {
        ...state.board,
        tasks: state.board.tasks.filter((task) => task._id !== id),
      },
    };
  }),
  on(
    BoardActions.deleteTaskError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.updateTasksSetSuccess,
    (state, { updatedTasks }): BoardFeatureState => {
      return {
        ...state,
        board: {
          ...state.board,
          tasks: state.board.tasks.map((task) => {
            const updated = updatedTasks.find(
              (updatedTask) => task._id === updatedTask._id,
            );
            return updated || task;
          }),
        },
      };
    },
  ),
  on(
    BoardActions.updateTaskError,
    (state, { error }): BoardFeatureState => ({
      ...state,
      error,
    }),
  ),
  on(
    BoardActions.clearError,
    (state): BoardFeatureState => ({
      ...state,
      error: null,
    }),
  ),
);
