import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, Observable } from 'rxjs';
import * as BoardActions from '../../store/board.actions';
import { selectTaskViewMode } from '../../store/board.selectors';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filter = new FormControl();

  view$!: Observable<string>;

  selectedView!: string;

  constructor(private store: Store) {
    this.view$ = this.store.select(selectTaskViewMode);
  }

  ngOnInit(): void {
    this.filter.valueChanges
      .pipe(
        map((value) => value.trim().toLowerCase()),
        distinctUntilChanged(),
        map((value) => {
          if (value.length > 2) return value;
          return '';
        }),
      )
      .subscribe((filterValue: string) =>
        this.store.dispatch(BoardActions.setMainTaskFilter({ filterValue })),
      );
  }

  onTasksUserViewChange(view: string) {
    this.selectedView = view;

    this.store.dispatch(
      BoardActions.setTaskViewMode({ viewMode: this.selectedView }),
    );
  }
}
