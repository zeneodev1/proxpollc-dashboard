import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternalServerRoutingModule } from './internal-server-routing.module';
import { InternalServerComponent } from './internal-server.component';


@NgModule({
  declarations: [InternalServerComponent],
  imports: [
    CommonModule,
    InternalServerRoutingModule
  ]
})
export class InternalServerModule { }
