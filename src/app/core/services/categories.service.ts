import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../../shared/model/category';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../shared/model/department';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  saveCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.API_URL + '/categories', category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/categories');
  }

  getCategoryById(id: string | null): Observable<Category> {
    return this.httpClient.get<Category>(this.API_URL + '/categories/' + id);
  }

  deleteCategory(id: string | undefined): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/categories/' + id);
  }

  updateCategory(category: Category): Observable<void> {
    return this.httpClient.put<void>(this.API_URL + '/categories', category);
  }

  getCategoriesByDepartmentId(id: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_URL + '/departments/' + id + '/categories');
  }

}
