import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../../../core/services/upload.service';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {Router} from '@angular/router';
import {Department} from '../../../../shared/model/department';
import {CategoriesService} from '../../../../core/services/categories.service';
import {Category} from '../../../../shared/model/category';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  public tags: string[] = [];
  public categoryForm: FormGroup;
  public isSubmitting: boolean;
  public isDiscarding: boolean;
  public loaded: boolean;
  public departments: Department[];
  constructor(private uploadService: UploadService,
              private categoriesService: CategoriesService,
              private departmentsService: DepartmentsService,
              private router: Router) {
    this.categoryForm = new FormGroup(
      {
        tags: new FormControl(''),
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
        departmentId: new FormControl('', Validators.required)
      }
    );
    this.isSubmitting = false;
    this.isDiscarding = false;
    this.loaded = false;
    this.departments = [];
    this.getAllDepartments();
  }

  getAllDepartments(): void {
    this.departmentsService.getAllDepartments().subscribe(value => {
      console.log(value);
      this.departments = value;
      this.loaded = true;
    });
  }

  ngOnInit(): void {
  }

  addTag(): void {
    if (this.categoryForm.get('tags')?.value !== null && this.categoryForm.get('tags')?.value.trim() !== '') {
      this.tags.push(this.categoryForm.get('tags')?.value.trim().replace(',', ''));
      this.categoryForm.get('tags')?.setValue('');
    }
  }

  submit(): boolean {
    if (this.categoryForm.valid) {
      const category = this.getCategory();
      this.isSubmitting = true;
      this.categoriesService.saveCategory(category).subscribe(value => {
        console.log(value);
        this.router.navigate(['/categories/all']).then();
      }, (error => {
        this.isSubmitting = false;
      }));
    }
    return false;
  }

  getCategory(): Category {
    const category = new Category();
    category.name = this.categoryForm.get('name')?.value;
    category.description = this.categoryForm.get('description')?.value;
    category.departmentId = this.categoryForm.get('departmentId')?.value;
    category.productCount = 0;
    category.tags = this.tags;
    console.log(category);
    return category;
  }

  deleteTag(i: number): void {
    this.tags.splice(i, 1);
  }

  discard(): void {
    this.isDiscarding = true;
  }

  cancelDiscarding(): void {
    this.isDiscarding = false;
  }

}
