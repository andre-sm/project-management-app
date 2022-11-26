import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map } from 'rxjs';
import * as BoardActions from '../../store/board.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  filter = new FormControl();

  constructor(private store: Store) {}

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
}
