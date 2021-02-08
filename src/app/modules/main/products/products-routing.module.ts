import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddProductsModule} from './add-products/add-products.module';
import {AllProductsModule} from './all-products/all-products.module';
import {EditProductModule} from './edit-product/edit-product.module';

const routes: Routes = [
  {path: '', redirectTo: '/products/all', pathMatch: 'full'},
  {path: '', children: [
      {path: 'add', loadChildren: () => AddProductsModule},
      {path: 'all', loadChildren: () => AllProductsModule},
      {path: 'edit/:id', loadChildren: () => EditProductModule}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
