import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?._token,
);
