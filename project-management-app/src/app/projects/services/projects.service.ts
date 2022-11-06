import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateProject, Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('/boards');
  }

  createProject(projectFormData: CreateProject): Observable<Project> {
    return this.http.post<Project>('/boards', projectFormData);
  }

  deleteProject(id: string): Observable<Response> {
    return this.http.delete<Response>(`/boards/${id}`);
  }
}
