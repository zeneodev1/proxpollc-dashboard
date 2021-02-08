import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InternalServerComponent} from './internal-server.component';

const routes: Routes = [
  {path: '', component: InternalServerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalServerRoutingModule { }
