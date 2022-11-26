import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/projects/models';
import { selectUsers } from 'src/app/projects/store/projects.selector';
import { Task } from '../../models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  users!: { id: string; name: string; color: string }[];

  allUsers!: User[];

  @Input() task!: Task;

  @Output() deleteClick = new EventEmitter<Task>();

  constructor(private store: Store) {
    this.store.select(selectUsers).subscribe((allUsers) => {
      this.allUsers = allUsers;
    });
  }

  ngOnInit(): void {
    this.users = this.task.users.map((user: string) => {
      return {
        id: user,
        name: this.allUsers.find((item) => item._id === user)?.name || '',
        color: this.allUsers.find((item) => item._id === user)?.color || '',
      };
    });
  }

  deleteTask(event: Event) {
    event.stopPropagation();
    this.deleteClick.emit(this.task);
  }
}
