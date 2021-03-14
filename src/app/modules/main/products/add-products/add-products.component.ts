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
import {environment} from '../../../../../environments/environment';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  private api_url: string = environment.api_url;
  public tags: string[] = [];
  public images: string[] = [];
  public productForm: FormGroup;
  public statusHint = 0;
  public isSubmitting: boolean;
  public isUploading: boolean;
  isDiscarding: boolean;
  public loaded: boolean;
  public departments: Department[];
  public categories: Category[];
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '15rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
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
        height: new FormControl('', Validators.required),
        width: new FormControl('', Validators.required),
        length: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required),
        condition: new FormControl('', Validators.required),
        content: new FormControl(''),
        chargeTaxes: new FormControl(false)
      }
    );
    this.isSubmitting = false;
    this.isDiscarding = false;
    this.isUploading = false;
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
    console.log(this.productForm.valid && !this.isSubmitting);
    if (this.productForm.valid) {
      const product = new Product();
      product.title = this.productForm.get('title')?.value;
      product.description = this.productForm.get('description')?.value;
      product.departmentId = this.productForm.get('departmentId')?.value;
      product.categoryId = this.productForm.get('categoryId')?.value;
      product.price = this.productForm.get('price')?.value;
      product.status = this.productForm.get('status')?.value;
      product.quantity = this.productForm.get('quantity')?.value;
      product.condition = this.productForm.get('condition')?.value;
      product.information.height = this.productForm.get('height')?.value;
      product.information.length = this.productForm.get('length')?.value;
      product.information.width = this.productForm.get('width')?.value;
      product.information.weight = this.productForm.get('weight')?.value;
      product.costPerItem = this.productForm.get('costPerItem')?.value;
      product.chargeTaxes = this.productForm.get('chargeTaxes')?.value;
      product.productDescription.content = this.productForm.get('content')?.value;
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
    this.isUploading = true;
    this.uploadService.uploadFile(selectedFile).subscribe(value => {
      this.isUploading = false;
      console.log(value);
      this.images.push(this.api_url + '/files/' + value[0].name);
    }, () => {
      this.isUploading = false;
    });
  }

  deleteImage(i: number): void {
    const url = this.images[i];
    this.images.splice(i, 1);
    this.uploadService.deleteFile(url);
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
