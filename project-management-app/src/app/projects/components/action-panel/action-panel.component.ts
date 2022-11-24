import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProjectsActions from '../../store/projects.actions';
import { selectViewMode } from '../../store/projects.selector';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss'],
})
export class ActionPanelComponent {
  selectedView!: string;

  view$!: Observable<string>;

  constructor(private store: Store) {
    this.view$ = this.store.select(selectViewMode);
  }

  onViewChange(view: string) {
    this.selectedView = view;
    this.store.dispatch(
      ProjectsActions.setViewMode({ view: this.selectedView }),
    );
    localStorage.setItem('projectsView', this.selectedView);
  }
}
