import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDepartmentsRoutingModule } from './add-departments-routing.module';
import { AddDepartmentsComponent } from './add-departments.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [AddDepartmentsComponent],
  imports: [
    CommonModule,
    AddDepartmentsRoutingModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    SpinnerModule
  ]
})
export class AddDepartmentsModule { }
