import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ColumnFormComponent } from '../../components/column-form/column-form.component';
import { BoardInfo, Column } from '../../models';
import * as BoardActions from '../../store/board.actions';
import {
  selectBoardInfo,
  selectColumnsWithTasks,
} from '../../store/board.selectors';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit {

  boardInfo$!: Observable<BoardInfo>;

  columns$!: Observable<Column[]>;

  columns!: Column[];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public dialog: MatDialog,
    private translate: TranslateService,
  ) {
    this.columns$ = this.store.select(selectColumnsWithTasks);
    this.boardInfo$ = this.store.select(selectBoardInfo);
  }

  ngOnInit(): void {
    this.getProjectData();
    this.columns$.pipe(
      tap(columns => {
        this.columns = columns;
        console.log('onInit', this.columns)
      })
      ).subscribe()
  }

  getProjectData(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(BoardActions.getBoard({ id }));
  }

  createColumn(): void {
    const createDialogConfig = new MatDialogConfig();
    createDialogConfig.disableClose = true;
    createDialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.projectBoardPage.dialog')
      .subscribe((config) => {
        createDialogConfig.data = {
          formTitle: config.formTitle,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
          id: null,
        };
      });

    this.dialog.open(ColumnFormComponent, createDialogConfig);
  }

  // changeColumnOrder(index: number): void {
  //   const newOrder = this.columns.slice(index + 1).map((item) => {
  //     return {
  //       _id: item._id,
  //       order: item.order - 1,
  //     };
  //   });
  //   this.store.dispatch(BoardActions.updateColumnsSet({ columns: newOrder }));
  // }

  drop(event: CdkDragDrop<Column[]>): void {
    console.log('event', event)
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    if (event.previousIndex !== event.currentIndex) {
      console.log('event.previousContainer.data', event.previousContainer.data)
      console.log('event.container.data',event.container.data)
      const previousContainerOrder = this.getUpdatedColumnsOrder(
        event.previousContainer.data,
      );

      this.store.dispatch(
        BoardActions.updateColumnsSet({ columns: previousContainerOrder }),
      );
    }

  }

  getUpdatedColumnsOrder(
    columns: Column[],
  ) {
    return columns.map((item, i) => {
      console.log(item, i)
      return {
        _id: item._id,
        order: i,
      };
    });
  }
}
