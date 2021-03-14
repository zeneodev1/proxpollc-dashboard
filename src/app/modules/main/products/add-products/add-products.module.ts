import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@kolkov/angular-editor';


@NgModule({
  declarations: [AddProductsComponent],
  imports: [
    CommonModule,
    AddProductsRoutingModule,
    CardModule,
    SpinnerModule,
    ReactiveFormsModule,
    AngularEditorModule
  ]
})
export class AddProductsModule { }
