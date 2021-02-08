import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../shared/components/spinner/spinner.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    SpinnerModule
  ]
})
export class LoginModule { }
