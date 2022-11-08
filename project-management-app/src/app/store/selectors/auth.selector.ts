import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../auth/store/models/auth-state.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.getUserToken(),
);
