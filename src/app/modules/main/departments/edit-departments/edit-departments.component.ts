import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadService} from '../../../../core/services/upload.service';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {Department} from '../../../../shared/model/department';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-departments',
  templateUrl: './edit-departments.component.html',
  styleUrls: ['./edit-departments.component.css']
})
export class EditDepartmentsComponent implements OnInit {
  private api_url: string = environment.api_url;
  public id: string | null;
  public tags: string[] = [];
  public images: string[] = [];
  public departmentForm: FormGroup;
  public statusHint = 0;
  public isSubmitting: boolean;
  public isDiscarding: boolean;
  public isUploading: boolean;
  public isLoaded: boolean;
  private department: Department;
  constructor(private uploadService: UploadService,
              private departmentsService: DepartmentsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.id = null;
    this.department = new Department();
    activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.departmentsService.getDepartmentById(this.id).subscribe(value => {
        this.department = value;
        this.initDepartment(value);
      });
    });
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
    this.isLoaded = false;
  }

  ngOnInit(): void {
  }

  initDepartment(department: Department): void {
    this.isLoaded = true;
    this.departmentForm.get('name')?.setValue(department.name);
    this.departmentForm.get('description')?.setValue(department.description);
    this.tags = department.tags ? department.tags : [];
    this.images = department.images ? department.images : [];
  }

  addTag(): void {
    if (this.departmentForm.get('tags')?.value !== null && this.departmentForm.get('tags')?.value.trim() !== '') {
      this.tags.push(this.departmentForm.get('tags')?.value.trim().replace(',', ''));
      this.departmentForm.get('tags')?.setValue('');
    }
  }

  submit(): boolean {
    if (this.departmentForm.valid && !this.isSubmitting) {
      this.department.name = this.departmentForm.get('name')?.value;
      this.department.description = this.departmentForm.get('description')?.value;
      this.department.images = this.images;
      this.department.tags = this.tags;
      this.isSubmitting = true;
      this.departmentsService.updateDepartment(this.department).subscribe(value => {
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
