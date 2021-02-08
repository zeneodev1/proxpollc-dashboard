import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import {CardModule} from '../../../shared/components/card/card.module';
import {SpinnerModule} from '../../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CardModule,
    SpinnerModule
  ]
})
export class OrdersModule { }
