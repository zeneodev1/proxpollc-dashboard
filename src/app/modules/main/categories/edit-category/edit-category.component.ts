import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../../../shared/model/department';
import {UploadService} from '../../../../core/services/upload.service';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Category} from '../../../../shared/model/category';
import {CategoriesService} from '../../../../core/services/categories.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  public id: string | null;
  public tags: string[] = [];
  public categoryForm: FormGroup;
  public isSubmitting: boolean;
  public isDiscarding: boolean;
  public isLoaded: boolean;
  public departments: Department[];
  private category: Category;
  constructor(private uploadService: UploadService,
              private categoriesService: CategoriesService,
              private departmentsService: DepartmentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.id = null;
    this.category = new Category();
    // get category id
    activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      // get all departments
      departmentsService.getAllDepartments().subscribe(departments => {
        this.departments = departments;
        // get category by id
        this.categoriesService.getCategoryById(this.id).subscribe(category => {
          this.category = category;
          this.initCategory(category);
        });
      });
    });

    this.categoryForm = new FormGroup(
      {
        tags: new FormControl(''),
        name: new FormControl('', Validators.required),
        departmentId: new FormControl('', Validators.required),
        description: new FormControl(''),
      }
    );

    this.isSubmitting = false;
    this.isDiscarding = false;
    this.isLoaded = false;
    this.departments = [];
  }

  ngOnInit(): void {
  }

  initCategory(category: Category): void {
    this.isLoaded = true;
    this.categoryForm.get('name')?.setValue(category.name);
    this.categoryForm.get('description')?.setValue(category.description);
    this.categoryForm.get('departmentId')?.setValue(category.departmentId);
    this.tags = category.tags ? category.tags : [];
  }



  submit(): boolean {
    if (this.categoryForm.valid) {
      this.category.name = this.categoryForm.get('name')?.value;
      this.category.description = this.categoryForm.get('description')?.value;
      this.category.tags = this.tags;
      this.isSubmitting = true;
      this.categoriesService.updateCategory(this.category).subscribe(value => {
        this.router.navigate(['/categories/all']).then();
      }, (error => {
        this.isSubmitting = false;
      }));
    }
    return false;
  }

  addTag(): void {
    if (this.categoryForm.get('tags')?.value !== null && this.categoryForm.get('tags')?.value.trim() !== '') {
      this.tags.push(this.categoryForm.get('tags')?.value.trim().replace(',', ''));
      this.categoryForm.get('tags')?.setValue('');
    }
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
