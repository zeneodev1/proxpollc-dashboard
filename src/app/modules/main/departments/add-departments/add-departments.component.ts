import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../../../core/services/upload.service';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {Department} from '../../../../shared/model/department';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-departments',
  templateUrl: './add-departments.component.html',
  styleUrls: ['./add-departments.component.css']
})
export class AddDepartmentsComponent implements OnInit {
  public tags: string[] = [];
  public images: string[] = [];
  public departmentForm: FormGroup;
  public statusHint = 0;
  public isSubmitting: boolean;
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
    if (this.departmentForm.valid) {
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

}
