import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { Column, Task } from '../../models';
import { ColumnFormComponent } from '../column-form/column-form.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import * as BoardActions from '../../store/board.actions';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  height!: number;

  @Input() column!: Column;

  constructor(
    public dialog: MatDialog,
    private store: Store,
    private translate: TranslateService,
  ) {}

  editColumnDialog(): void {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.column.editDialog')
      .subscribe((config) => {
        editDialogConfig.data = {
          title: this.column.title,
          color: this.column.color,
          id: this.column._id,
          order: this.column.order,
          formTitle: config.formTitle,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
        };
      });

    this.dialog.open(ColumnFormComponent, editDialogConfig);
  }

  deleteColumnDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.column.deleteDialog')
      .subscribe((config) => {
        dialogConfig.data = {
          message: config.message,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
        };
      });

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(BoardActions.deleteColumn({ id: this.column._id }));
      }
    });
  }

  editTaskDialog(task: Task): void {
    const editDialogConfig = new MatDialogConfig();
    editDialogConfig.disableClose = true;
    editDialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.taskForm.editDialog')
      .subscribe((config) => {
        editDialogConfig.data = {
          formTitle: config.formTitle,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
          id: task._id,
          order: task.order,
          title: task.title,
          description: task.description,
          userId: task.userId,
          users: task.users,
          columnData: { columnId: this.column._id, title: this.column.title },
        };
      });

    this.dialog.open(TaskFormComponent, editDialogConfig);
  }

  deleteTaskDialog(task: Task, deletedTaskIndex: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.translate
      .get('PROJECT_BOARD.taskForm.deleteDialog')
      .subscribe((config) => {
        dialogConfig.data = {
          message: config.message,
          confirmText: config.confirmText,
          cancelText: config.cancelText,
        };
      });

    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.store.dispatch(
          BoardActions.deleteTask({ id: task._id, columnId: this.column._id }),
        );
        if (deletedTaskIndex !== this.column.tasks.length - 1) {
          this.changeTasksOrder(deletedTaskIndex);
        }
      }
    });
  }

  changeTasksOrder(index: number): void {
    const newOrder = this.column.tasks.slice(index + 1).map((item) => {
      return {
        _id: item._id,
        order: item.order - 1,
        columnId: item.columnId,
      };
    });
    this.store.dispatch(BoardActions.updateTasksSet({ tasks: newOrder }));
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.previousIndex !== event.currentIndex) {
        const previousContainerOrder = this.getUpdatedTaskOrder(
          event.previousContainer.data,
        );

        this.store.dispatch(
          BoardActions.updateTasksSet({ tasks: previousContainerOrder }),
        );
      }
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const previousContainerOrder = this.getUpdatedTaskOrder(
        event.previousContainer.data,
      );

      const targetColumn = event.event.target as HTMLElement;
      const targetColumnId = targetColumn.dataset['columnid'] as string;
      const droppedItemIndex = event.currentIndex;

      const currentContainerOrder = this.getUpdatedTaskOrder(
        event.container.data,
        targetColumnId,
        droppedItemIndex,
      );

      this.store.dispatch(
        BoardActions.updateTasksSet({
          tasks: [...previousContainerOrder, ...currentContainerOrder],
        }),
      );
    }
  }

  getUpdatedTaskOrder(
    tasks: Task[],
    columnId: string = '',
    taskIndex: number | null = null,
  ) {
    return tasks.map((item, i) => {
      return {
        _id: item._id,
        order: i,
        columnId: columnId && i === taskIndex ? columnId : item.columnId,
      };
    });
  }

  cdkDragStarted(event: any) {
    this.height = event.source.element.nativeElement.offsetHeight;
  }
}
