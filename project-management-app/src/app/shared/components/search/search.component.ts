import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  tap,
} from 'rxjs';
import { selectSearchResult } from 'src/app/projects/store/projects.selector';
import * as ProjectsActions from '../../../projects/store/projects.actions';

export interface SearchTasks {
  boardId: string;
  columnId: string;
  description: string;
  order: number;
  title: string;
  userId: string;
  users: Array<{ name: string; id: string }>;
  _id: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements AfterViewInit {
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  searchResults!: SearchTasks[] | undefined;

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
              ProjectsActions.setGlobalSearch({
                globalSearchValue: this.searchInput.nativeElement.value,
              }),
            );
            this.store.select(selectSearchResult).subscribe((result) => {
              this.searchResults = result;
            });
          } else {
            this.store.dispatch(
              ProjectsActions.setGlobalSearch({ globalSearchValue: '' }),
            );
            this.searchResults = undefined;
          }
        }),
      )
      .subscribe();
  }

  onResultClick(searchTask: string) {
    this.store.dispatch(ProjectsActions.setSearchTask({ searchTask }));
  }
}
