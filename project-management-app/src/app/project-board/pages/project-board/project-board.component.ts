import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { BoardInfo, Column } from '../../models';
import * as BoardActions from '../../store/board.actions';
import * as ProjectsActions from '../../../projects/store/projects.actions';
import {
  selectBoardInfo,
  selectColumnsWithTasks,
} from '../../store/board.selectors';
import { selectError } from '../../store/board.selectors';
import { ShowAlertService } from 'src/app/shared/services/show-alert.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss'],
})
export class ProjectBoardComponent implements OnInit,  OnDestroy {
  boardInfo$!: Observable<BoardInfo>;

  columns$!: Observable<Column[]>;

  errorSub!: Subscription

  constructor(private route: ActivatedRoute, private store: Store,  private showAlertService: ShowAlertService) {
    this.columns$ = this.store.select(selectColumnsWithTasks);
    this.boardInfo$ = this.store.select(selectBoardInfo);
    this.errorSub = this.store.select(selectError).pipe(
      tap((data) => {
        if(data) {
          this.showErrorAlert(data);
        } else {
          this.onHandleError()
        }
      })
    ).subscribe()

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
  }

  onHandleError() {
    this.store.dispatch(BoardActions.clearError());
  }

  private showErrorAlert(message: string) {
    this.showAlertService.showAlert(message);
  }
}
