import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CreateProject, Project } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private API_URL = 'https://rest-service-team-5.herokuapp.com';

  constructor(private http: HttpClient) {}

  createProject(projectFormData: CreateProject): Observable<Project> {
    return this.http.post<Project>(`${this.API_URL}/boards`, projectFormData);
  }
}
