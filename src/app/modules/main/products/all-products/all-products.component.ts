import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../shared/model/department';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {Product} from '../../../../shared/model/product';
import {ProductsService} from '../../../../core/services/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  products: Product[];
  selectedProduct: Product;
  isConfirmingDeletion: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  constructor(private productsService: ProductsService) {
    this.products = [];
    this.selectedProduct = new Product();
    this.isConfirmingDeletion = false;
    this.isDeleting = false;
    this.isLoading = false;
    this.getAllProducts();
  }

  ngOnInit(): void {
  }

  getAllProducts(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe(value => {
        this.products = value;
      }, (error => {
        this.isLoading = false;
      }),
      () => {
        this.isLoading = false;
      });
  }

  deleteProduct(product: Product): void {
    this.selectedProduct = product;
    this.isConfirmingDeletion = true;
  }

  confirmDeletion(): void {
    this.isDeleting = true;
    this.productsService.deleteProduct(this.selectedProduct.id).subscribe(() => {
        this.cancelDeletion();
        this.getAllProducts();
      }, (error => {})
      , () => {
        this.isDeleting = false;
      });
  }

  cancelDeletion(): void {
    this.selectedProduct = new Product();
    this.isConfirmingDeletion = false;
  }

}
