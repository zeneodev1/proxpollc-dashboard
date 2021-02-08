import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import {SpinnerModule} from '../spinner/spinner.module';



@NgModule({
  declarations: [CardComponent],
  exports: [
    CardComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule
  ]
})
export class CardModule { }
