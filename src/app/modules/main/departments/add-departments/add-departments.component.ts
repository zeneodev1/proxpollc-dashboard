import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../../../core/services/upload.service';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {Department} from '../../../../shared/model/department';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.css']
})
export class AddDepartmentsComponent implements OnInit {
  private api_url: string = environment.api_url;
  public tags: string[] = [];
  public images: string[] = [];
  public departmentForm: FormGroup;
  public statusHint = 0;
  public isSubmitting: boolean;
  public isUploading: boolean;
  isDiscarding: boolean;
  constructor(private uploadService: UploadService,
              private departmentsService: DepartmentsService,
              private router: Router) {
    this.departmentForm = new FormGroup(
      {
        tags: new FormControl(''),
        name: new FormControl('', Validators.required),
        description: new FormControl(''),
      }
    );
    this.isSubmitting = false;
    this.isDiscarding = false;
    this.isUploading = false;
  }

  ngOnInit(): void {
  }

  addTag(): void {
    if (this.departmentForm.get('tags')?.value !== null && this.departmentForm.get('tags')?.value.trim() !== '') {
      this.tags.push(this.departmentForm.get('tags')?.value.trim().replace(',', ''));
      this.departmentForm.get('tags')?.setValue('');
    }
  }

  submit($event?: Event): boolean {
    if (this.departmentForm.valid && !this.isSubmitting) {
      const department = new Department();
      department.name = this.departmentForm.get('name')?.value;
      department.description = this.departmentForm.get('description')?.value;
      department.categories = [];
      department.images = this.images;
      department.productCount = 0;
      department.tags = this.tags;
      this.isSubmitting = true;
      this.departmentsService.saveDepartment(department).subscribe(value => {
        console.log(value);
        this.router.navigate(['/departments/all']).then();
      }, (error => {
        this.isSubmitting = false;
      }));
    }
    return false;
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

}
