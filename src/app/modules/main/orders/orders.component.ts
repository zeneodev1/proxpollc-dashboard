import { Component, OnInit } from '@angular/core';
import {Product} from '../../../shared/model/product';
import {ProductsService} from '../../../core/services/products.service';
import {Order} from '../../../shared/model/order';
import {OrdersService} from '../../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  isLoading: boolean;
  constructor(private ordersService: OrdersService) {
    this.orders = [];
    this.isLoading = false;
    this.getAllOrders();
  }

  ngOnInit(): void {
  }

  getAllOrders(): void {
    this.isLoading = true;
    this.ordersService.getAllOrders().subscribe(value => {
        this.orders = value;
      }, (error => {
        this.isLoading = false;
      }),
      () => {
        this.isLoading = false;
      });
  }

}
