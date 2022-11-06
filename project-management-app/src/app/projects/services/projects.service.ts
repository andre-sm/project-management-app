import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateProject, Project } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.baseUrl}/boards`);
  }

  createProject(projectFormData: CreateProject): Observable<Project> {
    return this.http.post<Project>(
      `${environment.baseUrl}/boards`,
      projectFormData,
    );
  }

  deleteProject(id: string): Observable<Response> {
    return this.http.delete<Response>(`${environment.baseUrl}/boards/${id}`);
  }

  updateProject(
    title: string,
    description: string,
    id: string,
  ): Observable<Project> {
    return this.http.put<Project>(`${environment.baseUrl}/boards/${id}`, {
      title,
      description,
    });
  }
}
