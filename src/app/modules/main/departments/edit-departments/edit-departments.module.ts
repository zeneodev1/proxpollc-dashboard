import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDepartmentsRoutingModule } from './edit-departments-routing.module';
import { EditDepartmentsComponent } from './edit-departments.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [EditDepartmentsComponent],
  imports: [
    CommonModule,
    EditDepartmentsRoutingModule,
    CardModule,
    ReactiveFormsModule,
    SpinnerModule
  ]
})
export class EditDepartmentsModule { }
