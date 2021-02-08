import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCategoriesRoutingModule } from './add-categories-routing.module';
import { AddCategoriesComponent } from './add-categories.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AddCategoriesComponent],
  imports: [
    CommonModule,
    AddCategoriesRoutingModule,
    CardModule,
    SpinnerModule,
    ReactiveFormsModule
  ]
})
export class AddCategoriesModule { }
