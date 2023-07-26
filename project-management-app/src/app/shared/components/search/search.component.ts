import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, Observable } from 'rxjs';
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
export class SearchComponent implements OnInit {
  search = new FormControl('');

  searchResults$!: Observable<SearchTasks[] | undefined>;

  constructor(private store: Store) {
    this.searchResults$ = this.store.select(selectSearchResult);
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        map((value) => {
          if (value) {
            const clearValue = value.trim().toLowerCase();
            return clearValue.length > 2 ? clearValue : '';
          }
          return '';
        }),
        distinctUntilChanged(),
      )
      .subscribe((filterValue: string) =>
        this.store.dispatch(
          ProjectsActions.setGlobalSearch({ globalSearchValue: filterValue }),
        ),
      );
  }

  onResultClick(searchTask: string) {
    this.store.dispatch(ProjectsActions.setSearchTask({ searchTask }));
  }
}
