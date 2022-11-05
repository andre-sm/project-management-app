import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateProject, Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  data = [
    {
      id: '9a111e19-24ec-43e1-b8c4-13776842b8d5',
      title: 'Homework tasks',
      description: 'My board tasks',
    },
    {
      id: '9a111e19-24ec-43e1-few4-13776842b8d5',
      title: 'Homework tasks 2222',
      description: 'My board tasks 2222',
    },
    {
      id: '9a111e19-24ec-egfe-few4-13776842b8d5',
      title: 'Homework tasks 3333',
      description: 'My board tasks 3333',
    },
  ];

  private API_URL = 'https://rest-service-team-5.herokuapp.com';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return of(this.data);
  }

  createProject(projectFormData: CreateProject): Observable<Project> {
    return this.http.post<Project>(`/boards`, projectFormData);
  }

  deleteProject(id: string): Observable<Response> {
    return this.http.delete<Response>(`/boards/${id}`);
  }
}
