import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URL + '/products', product);
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API_URL + '/products');
  }

  getProductById(id: string | null): Observable<Product> {
    return this.httpClient.get<Product>(this.API_URL + '/products/' + id);
  }

  deleteProduct(id: string | undefined): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + '/products/' + id);
  }

  updateProduct(product: Product): Observable<void> {
    return this.httpClient.put<void>(this.API_URL + '/products', product);
  }

}
