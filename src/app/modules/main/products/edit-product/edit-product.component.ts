import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Department} from '../../../../shared/model/department';
import {Category} from '../../../../shared/model/category';
import {UploadService} from '../../../../core/services/upload.service';
import {ProductsService} from '../../../../core/services/products.service';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {CategoriesService} from '../../../../core/services/categories.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../../shared/model/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  public tags: string[] = [];
  public images: string[] = [];
  public productForm: FormGroup;
  public statusHint = 0;
  public isSubmitting: boolean;
  isDiscarding: boolean;
  public loaded: boolean;
  public product: Product;
  public departments: Department[];
  public categories: Category[];
  constructor(private uploadService: UploadService,
              private productsService: ProductsService,
              private departmentsService: DepartmentsService,
              private categoriesService: CategoriesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
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
    this.product = new Product();
    this.departments = [];
    this.categories = [];
    activatedRoute.paramMap.subscribe(value => {
      this.getProduct(value.get('id'));
    });
  }

  ngOnInit(): void {
  }

  getAllDepartments(): void {
    this.departmentsService.getAllDepartments().subscribe(value => {
      this.departments = value;
      this.loaded = true;
    });
    if (this.product.departmentId !== undefined) {
      this.categoriesService.getCategoriesByDepartmentId(this.product.departmentId).subscribe(value => {
        this.categories = value;
      });
    }
  }

  getProduct(id: string | null): void {
    this.productsService.getProductById(id).subscribe(value => {
      this.product = value;
      this.setupProductForm(this.product);
      this.getAllDepartments();
    });
  }

  setupProductForm(product: Product): void{
    this.productForm.get('title')?.setValue(product.title);
    this.productForm.get('description')?.setValue(product.description);
    this.productForm.get('departmentId')?.setValue(product.departmentId);
    this.productForm.get('categoryId')?.setValue(product.categoryId);
    this.productForm.get('price')?.setValue(product.price);
    this.productForm.get('status')?.setValue(product.status);
    this.productForm.get('quantity')?.setValue(product.quantity);
    this.productForm.get('costPerItem')?.setValue(product.costPerItem);
    this.productForm.get('chargeTaxes')?.setValue(product.chargeTaxes);
    this.images = this.product.images;
    this.tags = this.product.tags;
  }

  submit(): boolean {
    console.log(this.productForm.valid);
    if (this.productForm.valid) {
      this.product.title = this.productForm.get('title')?.value;
      this.product.description = this.productForm.get('description')?.value;
      this.product.departmentId = this.productForm.get('departmentId')?.value;
      this.product.categoryId = this.productForm.get('categoryId')?.value;
      this.product.price = this.productForm.get('price')?.value;
      this.product.status = this.productForm.get('status')?.value;
      this.product.quantity = this.productForm.get('quantity')?.value;
      this.product.costPerItem = this.productForm.get('costPerItem')?.value;
      this.product.chargeTaxes = this.productForm.get('chargeTaxes')?.value;
      this.product.images = this.images;
      this.product.tags = this.tags;
      this.isSubmitting = true;
      this.productsService.updateProduct(this.product).subscribe(value => {
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
