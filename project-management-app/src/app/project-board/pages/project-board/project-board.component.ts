import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ShowAlertService } from 'src/app/shared/services/show-alert.service';
import { BoardInfo, Column } from '../../models';
import * as BoardActions from '../../store/board.actions';
import * as ProjectsActions from '../../../projects/store/projects.actions';
import {
  selectBoardInfo,
  selectColumnsIds,
  selectColumnsWithTasks,
  selectIsLoading,
  selectError,
} from '../../store/board.selectors';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit, OnDestroy {
  boardInfo$!: Observable<BoardInfo>;

  columns$!: Observable<Column[]>;

  columnsIds$!: Observable<string[]>;

  isLoading$!: Observable<boolean>;

  errorSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private showAlertService: ShowAlertService,
  ) {
    this.columns$ = this.store.select(selectColumnsWithTasks);
    this.columnsIds$ = this.store.select(selectColumnsIds);
    this.boardInfo$ = this.store.select(selectBoardInfo);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.errorSub = this.store
      .select(selectError)
      .pipe(
        tap((data) => {
          if (data) {
            this.showErrorAlert(data);
          } else {
            this.onHandleError();
          }
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.getProjectData();
    this.store.dispatch(ProjectsActions.getUsers());
  }

  getProjectData(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(BoardActions.getBoard({ id }));
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.store.dispatch(BoardActions.clearProjectData());
  }

  onHandleError() {
    this.store.dispatch(BoardActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.showAlertService.showAlert(message);
  }

  drop(event: CdkDragDrop<Column[]>): void {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );

    if (event.previousIndex !== event.currentIndex) {
      const updatedColumns = event.container.data.map((item, i) => {
        return {
          _id: item._id,
          order: i,
        };
      });
      this.store.dispatch(
        BoardActions.updateColumnsSet({ columns: updatedColumns }),
      );
    }
  }
}
