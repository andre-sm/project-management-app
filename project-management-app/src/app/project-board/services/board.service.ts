import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Column, Board, Task, TaskSet } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoardById(boardId: string): Observable<Board> {
    return this.http.get<Board>(`${environment.baseUrl}/boards/${boardId}`);
  }

  getColumns(boardId: string): Observable<Column[]> {
    return this.http.get<Column[]>(
      `${environment.baseUrl}/boards/${boardId}/columns`,
    );
  }

  getTasks(boardId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseUrl}/tasksSet/${boardId}`);
  }

  createColumn(
    title: string,
    color: string,
    order: number,
    boardId: string | null,
  ): Observable<Column> {
    return this.http.post<Column>(
      `${environment.baseUrl}/boards/${boardId}/columns`,
      { title, color, order },
    );
  }

  deleteColumn(id: string, boardId: string): Observable<Response> {
    return this.http.delete<Response>(
      `${environment.baseUrl}/boards/${boardId}/columns/${id}`,
    );
  }

  updateColumn(
    title: string,
    color: string,
    id: string,
    order: number | null,
    boardId: string,
  ): Observable<Column> {
    return this.http.put<Column>(
      `${environment.baseUrl}/boards/${boardId}/columns/${id}`,
      {
        title,
        color,
        order,
      },
    );
  }

  createTask(
    title: string,
    description: string,
    columnId: string,
    users: string[],
    order: number | undefined,
    userId: string | undefined,
    boardId: string | null,
  ): Observable<Task> {
    return this.http.post<Task>(
      `${environment.baseUrl}/boards/${boardId}/columns/${columnId}/tasks`,
      { title, description, order, userId, users },
    );
  }

  updateTask(
    id: string,
    title: string,
    description: string,
    columnId: string,
    order: number,
    users: string[],
    userId: string | undefined,
    boardId: string,
  ): Observable<Task> {
    return this.http.put<Task>(
      `${environment.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${id}`,
      {
        title,
        description,
        order,
        userId,
        columnId,
        users,
      },
    );
  }

  deleteTask(
    id: string,
    columnId: string,
    boardId: string,
  ): Observable<Response> {
    return this.http.delete<Response>(
      `${environment.baseUrl}/boards/${boardId}/columns/${columnId}/tasks/${id}`,
    );
  }

  updateTasksSet(tasks: TaskSet[]): Observable<Task[]> {
    return this.http.patch<Task[]>(`${environment.baseUrl}/tasksSet`, tasks);
  }
}
