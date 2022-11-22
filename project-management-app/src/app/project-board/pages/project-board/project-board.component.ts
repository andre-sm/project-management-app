import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardInfo, Column } from '../../models';
import * as BoardActions from '../../store/board.actions';
import * as ProjectsActions from '../../../projects/store/projects.actions';
import {
  selectBoardInfo,
  selectColumnsWithTasks,
} from '../../store/board.selectors';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  boardInfo$!: Observable<BoardInfo>;

  columns$!: Observable<Column[]>;

  constructor(private route: ActivatedRoute, private store: Store) {
    this.columns$ = this.store.select(selectColumnsWithTasks);
    this.boardInfo$ = this.store.select(selectBoardInfo);
  }

  ngOnInit(): void {
    this.getProjectData();
    this.store.dispatch(ProjectsActions.getUsers());
  }

  getProjectData(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(BoardActions.getBoard({ id }));
  }
}
