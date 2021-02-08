import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditDepartmentsComponent} from './edit-departments.component';

const routes: Routes = [
  {path: '', component: EditDepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDepartmentsRoutingModule { }
