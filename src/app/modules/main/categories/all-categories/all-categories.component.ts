import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../shared/model/department';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {Category} from '../../../../shared/model/category';
import {CategoriesService} from '../../../../core/services/categories.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  categories: Category[];
  selectedCategory: Category;
  isConfirmingDeletion: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  constructor(private categoriesService: CategoriesService) {
    this.categories = [];
    this.selectedCategory = new Category();
    this.isConfirmingDeletion = false;
    this.isDeleting = false;
    this.isLoading = false;
    this.getAllCategories();
  }

  ngOnInit(): void {
  }

  getAllCategories(): void {
    this.isLoading = true;
    this.categoriesService.getAllCategories().subscribe(value => {
        this.categories = value;
      }, (error => {}),
      () => {
        this.isLoading = false;
      });
  }

  deleteCategory(category: Category): void {
    this.selectedCategory = category;
    this.isConfirmingDeletion = true;
  }

  confirmDeletion(): void {
    this.isDeleting = true;
    this.categoriesService.deleteCategory(this.selectedCategory.id).subscribe(() => {
        this.cancelDeletion();
        this.getAllCategories();
      }, (error => {})
      , () => {
        this.isDeleting = false;
      });
  }

  cancelDeletion(): void {
    this.selectedCategory = new Category();
    this.isConfirmingDeletion = false;
  }
}
