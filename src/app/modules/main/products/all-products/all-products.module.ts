import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllProductsRoutingModule } from './all-products-routing.module';
import { AllProductsComponent } from './all-products.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [AllProductsComponent],
    imports: [
        CommonModule,
        AllProductsRoutingModule,
        CardModule,
        SpinnerModule
    ]
})
export class AllProductsModule { }
