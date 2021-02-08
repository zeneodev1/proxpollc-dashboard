import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartmentsComponent} from './departments.component';
import {AddDepartmentsModule} from './add-departments/add-departments.module';
import {AllDepartmentsModule} from './all-departments/all-departments.module';
import {EditDepartmentsModule} from './edit-departments/edit-departments.module';

const routes: Routes = [
  {path: '', redirectTo: '/departments/all', pathMatch: 'full'},
  {path: '', component: DepartmentsComponent, children: [
      {path: 'add', loadChildren: () => AddDepartmentsModule},
      {path: 'all', loadChildren: () => AllDepartmentsModule},
      {path: 'edit/:id', loadChildren: () => EditDepartmentsModule}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
