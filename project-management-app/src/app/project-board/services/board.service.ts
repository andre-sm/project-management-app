import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Column, Board, ColumnResponse, User, Task } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getBoardById(boardId: string): Observable<Board> {
    return this.http.get<Board>(`${environment.baseUrl}/boards/${boardId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`);
  }

  createColumn(title: string, boardId: string | null): Observable<Column> {
    return this.http.post<Column>(
      `${environment.baseUrl}/boards/${boardId}/columns`,
      { title },
    );
  }

  deleteColumn(id: string, boardId: string): Observable<Response> {
    return this.http.delete<Response>(
      `${environment.baseUrl}/boards/${boardId}/columns/${id}`,
    );
  }

  updateColumn(
    title: string,
    id: string,
    order: number | null,
    boardId: string,
  ): Observable<ColumnResponse> {
    return this.http.put<ColumnResponse>(
      `${environment.baseUrl}/boards/${boardId}/columns/${id}`,
      {
        title,
        order,
      },
    );
  }

  createTask(
    title: string,
    description: string,
    userId: string,
    columnId: string,
    boardId: string | null,
  ): Observable<Task> {
    return this.http.post<Task>(
      `${environment.baseUrl}/boards/${boardId}/columns/${columnId}/tasks`,
      { title, description, userId },
    );
  }
}
