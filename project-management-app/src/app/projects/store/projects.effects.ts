import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, catchError, of, mergeMap } from 'rxjs';
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
          catchError((error) =>
            of(ProjectsActions.getProjectsError({ error: error.message })),
          ),
        ),
      ),
    );
  });

  createProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.createProject),
      mergeMap(({ title, description }) => {
        return this.projectsService.createProject({ title, description }).pipe(
          map((newProject) =>
            ProjectsActions.createProjectSuccess({ newProject }),
          ),
          catchError((error) =>
            of(ProjectsActions.createProjectError({ error: error.message })),
          ),
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
          catchError((error) =>
            of(ProjectsActions.deleteProjectError({ error: error.message })),
          ),
        );
      }),
    );
  });

  updateProject$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProjectsActions.updateProject),
      mergeMap(({ title, description, id }) => {
        return this.projectsService.updateProject(title, description, id).pipe(
          map((updatedProject) =>
            ProjectsActions.updateProjectSuccess({ updatedProject }),
          ),
          catchError((error) =>
            of(ProjectsActions.deleteProjectError({ error: error.message })),
          ),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private projectsService: ProjectsService,
    private store: Store,
  ) {}
}
