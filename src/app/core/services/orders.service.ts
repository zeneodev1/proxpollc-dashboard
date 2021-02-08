import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Department} from '../../shared/model/department';
import {Observable} from 'rxjs';
import {Order} from '../../shared/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private API_URL = environment.api_url;

  constructor(private httpClient: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(this.API_URL + '/orders');
  }}
