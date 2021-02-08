import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllDepartmentsRoutingModule } from './all-departments-routing.module';
import { AllDepartmentsComponent } from './all-departments.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [AllDepartmentsComponent],
    imports: [
        CommonModule,
        AllDepartmentsRoutingModule,
        CardModule,
        SpinnerModule
    ]
})
export class AllDepartmentsModule { }
