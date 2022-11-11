import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColumnFormComponent } from '../../components/column-form/column-form.component';
import { BoardInfo, Column } from '../../models';
import * as BoardActions from '../../store/board.actions';
import {
  selectBoardInfo,
  selectBoardColumns,
} from '../../store/board.selectors';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {
  boardInfo$!: Observable<BoardInfo>;

  columns$!: Observable<Column[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
  ) {
    this.columns$ = this.store.select(selectBoardColumns);
    this.boardInfo$ = this.store.select(selectBoardInfo);
  }

  ngOnInit(): void {
    this.getProjectData();
  }

  getProjectData(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(BoardActions.getBoard({ id }));
  }

  createColumn(): void {
    const createDialogConfig = new MatDialogConfig();
    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    createDialogConfig.data = {
      formTitle: 'Create column',
      confirmText: 'Create',
      cancelText: 'Close',
      id: null,
    };

    this.dialog.open(ColumnFormComponent, createDialogConfig);
  }
}
