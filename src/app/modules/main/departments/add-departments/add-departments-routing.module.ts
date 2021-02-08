import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddDepartmentsComponent} from './add-departments.component';

const routes: Routes = [
  {path: '', component: AddDepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDepartmentsRoutingModule { }
