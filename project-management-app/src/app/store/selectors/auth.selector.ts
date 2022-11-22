import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../auth/store/models/auth-state.model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user,
);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.token,
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => !!state.user,
);

export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading,
);

export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.userId,
);

export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.name,
);

export const selectAvatarColor = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.color,
)
