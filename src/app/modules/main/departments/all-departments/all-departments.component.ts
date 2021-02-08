import { Component, OnInit } from '@angular/core';
import {Department} from '../../../../shared/model/department';
import {DepartmentsService} from '../../../../core/services/departments.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.css']
})
export class AllDepartmentsComponent implements OnInit {
  departments: Department[];
  selectedDepartment: Department;
  isConfirmingDeletion: boolean;
  isDeleting: boolean;
  isLoading: boolean;
  constructor(private departmentsService: DepartmentsService) {
    this.departments = [];
    this.selectedDepartment = new Department();
    this.isConfirmingDeletion = false;
    this.isDeleting = false;
    this.isLoading = false;
    this.getAllDepartments();
  }

  ngOnInit(): void {
  }

  getAllDepartments(): void {
    this.isLoading = true;
    this.departmentsService.getAllDepartments().subscribe(value => {
      value.forEach(v => {
        v.categories = v.categories?.filter(v1 => {
          return v1 !== null;
        });
      });
      this.departments = value;
    }, (error => {}),
      () => {
      this.isLoading = false;
    });
  }

  deleteDepartment(department: Department): void {
    this.selectedDepartment = department;
    this.isConfirmingDeletion = true;
  }

  confirmDeletion(): void {
    this.isDeleting = true;
    this.departmentsService.deleteDepartment(this.selectedDepartment.id).subscribe(() => {
      this.cancelDeletion();
      this.getAllDepartments();
    }, (error => {})
    , () => {
      this.isDeleting = false;
    });
  }

  cancelDeletion(): void {
    this.selectedDepartment = new Department();
    this.isConfirmingDeletion = false;
  }

}
