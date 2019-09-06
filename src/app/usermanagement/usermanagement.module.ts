import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserManagementComponent } from './usermanagement.component';
import { UserManagementRoutes } from './usermanagement.routing';
import { UserManagementDialog } from './usermanagement.dialog/usermanagement.dialog.component';
import { UserService } from './usermanagement.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(UserManagementRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    UserManagementDialog
  ],
  providers: [UserService],
  declarations: [UserManagementComponent, UserManagementDialog]
})
export class UserManagementModule {}
