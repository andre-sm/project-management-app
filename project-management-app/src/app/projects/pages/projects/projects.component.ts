import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ProjectsActions from '../../store/projects.actions';
import { Project } from '../../models';
import { selectProjects } from '../../store/projects.selector';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$!: Observable<Project[]>;

  constructor(private store: Store) {
    this.projects$ = this.store.select(selectProjects);
  }

  ngOnInit(): void {
    this.store.dispatch(ProjectsActions.getProjects());
  }
}
