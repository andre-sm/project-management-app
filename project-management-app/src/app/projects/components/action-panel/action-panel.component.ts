import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { HandleViewService } from '../../services/handle-view-on-mobile.service';
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

  screenSize$: BehaviorSubject<number> = this.handleViewService.screenSize$;

  constructor(
    private store: Store,
    protected handleViewService: HandleViewService,
  ) {
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
