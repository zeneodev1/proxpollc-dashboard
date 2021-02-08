import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllCategoriesRoutingModule } from './all-categories-routing.module';
import { AllCategoriesComponent } from './all-categories.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [AllCategoriesComponent],
    imports: [
        CommonModule,
        AllCategoriesRoutingModule,
        CardModule,
        SpinnerModule
    ]
})
export class AllCategoriesModule { }
