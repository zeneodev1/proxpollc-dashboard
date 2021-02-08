import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllDepartmentsComponent} from './all-departments.component';

const routes: Routes = [
  {path: '', component: AllDepartmentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllDepartmentsRoutingModule { }
