import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../../../core/services/upload.service';
import {Router} from '@angular/router';
import {ProductsService} from '../../../../core/services/products.service';
import {Product} from '../../../../shared/model/product';
import {Department} from '../../../../shared/model/department';
import {Category} from '../../../../shared/model/category';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {CategoriesService} from '../../../../core/services/categories.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  public tags: string[] = [];
  public images: string[] = [];
  public productForm: FormGroup;
  public statusHint = 0;
  public isSubmitting: boolean;
  isDiscarding: boolean;
  public loaded: boolean;
  public departments: Department[];
  public categories: Category[];
  constructor(private uploadService: UploadService,
              private productsService: ProductsService,
              private departmentsService: DepartmentsService,
              private categoriesService: CategoriesService,
              private router: Router) {
    this.productForm = new FormGroup(
      {
        tags: new FormControl(''),
        title: new FormControl('', Validators.required),
        description: new FormControl(''),
        status: new FormControl('DRAFT', Validators.required),
        departmentId: new FormControl('', Validators.required),
        categoryId: new FormControl('', Validators.required),
        price: new FormControl('', Validators.required),
        costPerItem: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        chargeTaxes: new FormControl(false)
      }
    );
    this.isSubmitting = false;
    this.isDiscarding = false;
    this.loaded = false;
    this.departments = [];
    this.categories = [];
    this.getAllDepartments();
  }

  ngOnInit(): void {
  }

  getAllDepartments(): void {
    this.departmentsService.getAllDepartments().subscribe(value => {
      console.log(value);
      this.departments = value;
      this.loaded = true;
    });
  }

  submit(): boolean {
    console.log(this.productForm.valid);
    if (this.productForm.valid) {
      const product = new Product();
      product.title = this.productForm.get('title')?.value;
      product.description = this.productForm.get('description')?.value;
      product.departmentId = this.productForm.get('departmentId')?.value;
      product.categoryId = this.productForm.get('categoryId')?.value;
      product.price = this.productForm.get('price')?.value;
      product.status = this.productForm.get('status')?.value;
      product.quantity = this.productForm.get('quantity')?.value;
      product.costPerItem = this.productForm.get('costPerItem')?.value;
      product.chargeTaxes = this.productForm.get('chargeTaxes')?.value;
      product.images = this.images;
      product.tags = this.tags;
      this.isSubmitting = true;
      this.productsService.saveProduct(product).subscribe(value => {
        this.router.navigate(['/products/all']).then();
      }, (error => {
        this.isSubmitting = false;
      }));
    }
    return false;
  }

  addTag(): void {
    if (this.productForm.get('tags')?.value !== null && this.productForm.get('tags')?.value.trim() !== '') {
      this.tags.push(this.productForm.get('tags')?.value.trim().replace(',', ''));
      this.productForm.get('tags')?.setValue('');
    }
  }

  deleteTag(i: number): void {
    this.tags.splice(i, 1);
  }

  onFileChange($event: any): void {
    const selectedFile = $event.target.files[0];
    this.uploadService.uploadFile(selectedFile).subscribe(value => {
      console.log(value);
      this.images.push(value[0].path);
    });
  }

  discard(): void {
    this.isDiscarding = true;
  }

  cancelDiscarding(): void {
    this.isDiscarding = false;
  }

  onStatusChanged(): void {
    this.statusHint = this.productForm.get('status')?.value === 'DRAFT' ? 0 : 1;
  }

  onChangeDepartment(): void {
    const val = this.productForm.get('departmentId')?.value;
    if (val !== '') {
      this.categoriesService.getCategoriesByDepartmentId(val).subscribe(value => {
        this.categories = value;
      });
    } else {
      this.categories = [];
    }
  }
}
