import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProjectsActions from '../../store/projects.actions';
import { ProjectRender } from '../../models';
import { selectRenderProjects } from '../../store/projects.selector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<ProjectRender[]>;

  constructor(private store: Store) {
    this.projects$ = this.store.select(selectRenderProjects);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getProjects());
  }
}
