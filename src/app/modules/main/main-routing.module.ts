import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {HomeModule} from './home/home.module';
import {ProductsModule} from './products/products.module';
import {CategoriesModule} from './categories/categories.module';
import {DepartmentsModule} from './departments/departments.module';
import {OrdersModule} from './orders/orders.module';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/products/all', pathMatch: 'full'},
  {path: '', component: MainComponent, children: [
      {path: 'home', loadChildren: () => HomeModule},
      {path: 'categories', loadChildren: () => CategoriesModule},
      {path: 'departments', loadChildren: () => DepartmentsModule},
      {path: 'orders', loadChildren: () => OrdersModule},
      {path: 'products', loadChildren: () => ProductsModule}
    ], canActivate: [AuthGuard]
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
