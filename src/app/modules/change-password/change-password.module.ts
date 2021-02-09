import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SpinnerModule,
    ReactiveFormsModule
  ]
})
export class ChangePasswordModule { }
