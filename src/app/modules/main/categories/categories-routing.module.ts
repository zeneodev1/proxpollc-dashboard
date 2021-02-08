import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from './categories.component';
import {AllCategoriesModule} from './all-categories/all-categories.module';
import {AddCategoriesModule} from './add-categories/add-categories.module';
import {EditCategoryModule} from './edit-category/edit-category.module';

const routes: Routes = [
  {path: '', redirectTo: '/categories/all', pathMatch: 'full'},
  {path: '', component: CategoriesComponent, children: [
      {path: 'all', loadChildren: () => AllCategoriesModule},
      {path: 'add', loadChildren: () => AddCategoriesModule},
      {path: 'edit/:id', loadChildren: () => EditCategoryModule}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
