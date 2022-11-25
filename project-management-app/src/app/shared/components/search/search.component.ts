import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';
import * as ProjectsActions from '../../../projects/store/projects.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        filter(Boolean),
        debounceTime(1500),
        distinctUntilChanged(),
        tap(() => {
          if (this.searchInput.nativeElement.value.length >= 3) {
            this.store.dispatch(
              ProjectsActions.setGlobalSearch({ globalSearchValue: this.searchInput.nativeElement.value }),
            );
          } else {
            this.store.dispatch(
              ProjectsActions.setGlobalSearch({ globalSearchValue: '' }),
            );
          }
        }),
      )
      .subscribe();
  }
}
