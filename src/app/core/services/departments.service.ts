import { Injectable } from '@angular/core';
import {Department} from '../../shared/model/department';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  saveDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(this.API_URL + '/departments', department);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.API_URL + '/departments');
  }

  getDepartmentById(id: string | null): Observable<Department> {
    return this.httpClient.get<Department>(this.API_URL + '/departments/' + id);
  }

  deleteDepartment(id: string | undefined): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/departments/' + id);
  }

  updateDepartment(department: Department): Observable<void> {
    return this.httpClient.put<void>(this.API_URL + '/departments', department);
  }

}
