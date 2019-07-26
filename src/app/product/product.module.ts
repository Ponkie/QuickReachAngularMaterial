import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductComponent } from './product.component';
import { ProductRoutes } from './product.routing';
import {DialogOverviewExampleDialog} from './product.component';
import { ProductService} from './product.service';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ProductRoutes),
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  providers: [ProductService],
  declarations: [ProductComponent, DialogOverviewExampleDialog]
})
export class ProductModule {}
