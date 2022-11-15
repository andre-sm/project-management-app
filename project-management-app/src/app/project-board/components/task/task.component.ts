import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task;

  @Output() deleteClick = new EventEmitter<Task>();

  deleteTask(event: Event) {
    event.stopPropagation();
    this.deleteClick.emit(this.task);
  }
}
