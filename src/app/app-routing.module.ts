import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginModule} from './modules/login/login.module';
import {MainModule} from './modules/main/main.module';
import {NotFoundComponent} from './shared/pages/errors/not-found/not-found.component';
import {NotFoundModule} from './shared/pages/errors/not-found/not-found.module';

const routes: Routes = [
  {path: 'login', loadChildren: () => LoginModule},
  {path: '', loadChildren: () => MainModule},
  {path: '404', loadChildren: () => NotFoundModule},
  {path: '**', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
