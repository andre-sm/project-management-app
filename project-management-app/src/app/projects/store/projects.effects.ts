import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, of, mergeMap, forkJoin } from 'rxjs';
import { HandleErrorsService } from 'src/app/shared/services/handle-error.service';
import { selectUserId } from '../../store/selectors/auth.selector';
import { selectProjectsIds } from './projects.selector';
import { User } from '../models';
import { ProjectsService } from '../services/projects.service';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
  loadProjects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getProjects),
      switchMap(() =>
        this.projectsService.getProjects().pipe(
          map((projects) => ProjectsActions.getProjectsSuccess({ projects })),
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(
              ProjectsActions.getProjectsError({ error: errorMessage }),
            );
          }),
        ),
      ),
    );
  });

  getProjectsTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getProjectsSuccess),
      concatLatestFrom(() => this.store.select(selectProjectsIds)),
      mergeMap(([, ids]) =>
        forkJoin(
          ids.map((id) => {
            return this.projectsService.getProjectTasks(id);
          }),
        ),
      ),
      map((tasks) =>
        ProjectsActions.getProjectsTasksSuccess({ tasks: tasks.flat(1) }),
      ),
      catchError((error) => {
        const errorMessage = this.handleErrorsService.handleErrorMessage(
          error.status,
        );
        return of(
          ProjectsActions.getProjectsTasksError({ error: errorMessage }),
        );
      }),
    );
  });

  createProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      concatLatestFrom(() => this.store.select(selectUserId)),
      mergeMap(([{ title, description, users }, owner]) => {
        return this.projectsService
          .createProject(title, description, users, owner)
          .pipe(
            map((newProject) =>
              ProjectsActions.createProjectSuccess({ newProject }),
            ),
            catchError((error) => {
              const errorMessage = this.handleErrorsService.handleErrorMessage(
                error.status,
              );
              return of(
                ProjectsActions.createProjectError({ error: errorMessage }),
              );
            }),
          );
      }),
    );
  });

  deleteProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      mergeMap(({ id }) => {
        return this.projectsService.deleteProject(id).pipe(
          map(() => ProjectsActions.deleteProjectSuccess({ id })),
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(
              ProjectsActions.deleteProjectError({ error: errorMessage }),
            );
          }),
        );
      }),
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      mergeMap(({ title, description, id, owner, users }) => {
        return this.projectsService
          .updateProject(title, description, id, owner, users)
          .pipe(
            map((updatedProject) =>
              ProjectsActions.updateProjectSuccess({ updatedProject }),
            ),
            catchError((error) => {
              const errorMessage = this.handleErrorsService.handleErrorMessage(
                error.status,
              );
              return of(
                ProjectsActions.deleteProjectError({ error: errorMessage }),
              );
            }),
          );
      }),
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.getUsers, ProjectsActions.getProjects),
      switchMap(() => {
        return this.projectsService.getUsers().pipe(
          map((users: User[]) => ProjectsActions.getUsersSuccess({ users })),
          catchError((error) => {
            const errorMessage = this.handleErrorsService.handleErrorMessage(
              error.status,
            );
            return of(ProjectsActions.getUsersError({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private store: Store,
    private handleErrorsService: HandleErrorsService,
  ) {}
}
