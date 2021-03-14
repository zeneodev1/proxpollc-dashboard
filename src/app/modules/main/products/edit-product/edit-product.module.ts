import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductRoutingModule } from './edit-product-routing.module';
import { EditProductComponent } from './edit-product.component';
import {CardModule} from '../../../../shared/components/card/card.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerModule} from '../../../../shared/components/spinner/spinner.module';
import {AngularEditorModule} from '@kolkov/angular-editor';


@NgModule({
  declarations: [EditProductComponent],
    imports: [
        CommonModule,
        EditProductRoutingModule,
        CardModule,
        ReactiveFormsModule,
        SpinnerModule,
        AngularEditorModule
    ]
})
export class EditProductModule { }
