import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductComponent } from './product.component';
import { ProductRoutes } from './product.routing';
import { ProductService} from './product.service';
import { ProductDialog } from './product.dialog/product.dialog';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ProductRoutes),
  ],
  entryComponents: [
    ProductDialog
  ],
  providers: [ProductService],
  declarations: [ProductComponent, ProductDialog]
})
export class ProductModule {}
