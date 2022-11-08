import { ActionReducerMap } from '@ngrx/store';

import * as fromAuthModel from '../auth/store/models/auth-state.model';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  auth: fromAuthModel.AuthState;
}

export const appReducer: ActionReducerMap<AppState, any> = {
  auth: fromAuth.authReducer,
};
