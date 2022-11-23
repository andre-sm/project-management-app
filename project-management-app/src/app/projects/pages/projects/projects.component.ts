import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProjectsActions from '../../store/projects.actions';
import { ProjectRender } from '../../models';
import {
  selectRenderProjects,
  selectViewMode,
} from '../../store/projects.selector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<ProjectRender[]>;

  view$!: Observable<string>;

  constructor(private store: Store) {
    this.projects$ = this.store.select(selectRenderProjects);
    this.view$ = this.store.select(selectViewMode);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getProjects());
  }
}
