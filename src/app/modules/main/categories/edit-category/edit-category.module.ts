import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCategoryRoutingModule } from './edit-category-routing.module';
import { EditCategoryComponent } from './edit-category.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [EditCategoryComponent],
  imports: [
    CommonModule,
    EditCategoryRoutingModule,
    CardModule,
    ReactiveFormsModule,
    SpinnerModule
  ]
})
export class EditCategoryModule { }
