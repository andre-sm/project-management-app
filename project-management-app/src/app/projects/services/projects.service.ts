import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project, User } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.baseUrl}/boards`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}/users`);
  }

  createProject(
    title: string,
    description: string,
    users: Array<string>,
    owner: string | undefined,
  ): Observable<Project> {
    return this.http.post<Project>(`${environment.baseUrl}/boards`, {
      title,
      description,
      owner,
      users,
    });
  }

  deleteProject(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.baseUrl}/boards/${id}`);
  }

  updateProject(
    title: string,
    description: string,
    id: string,
    owner: string,
    users: Array<string>,
  ): Observable<Project> {
    return this.http.put<Project>(`${environment.baseUrl}/boards/${id}`, {
      title,
      description,
      owner,
      users,
    });
  }
}
