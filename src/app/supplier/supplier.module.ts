import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SupplierComponent} from './supplier.component';
import { SupplierRoutes } from './supplier.routing';
import { SupplierService} from './supplier.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { SupplierDialog } from './supplier.dialog/supplier.addupdatedialog.component';
import { SupplierConfirm } from './supplier.dialog/supplier.deleteconfirm.component';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(SupplierRoutes),
    FormsModule
  ],
  entryComponents: [
    SupplierDialog, SupplierConfirm
  ],
  providers: [SupplierService],
  declarations: [SupplierComponent, SupplierDialog, SupplierConfirm]
})
export class SupplierModule {}
