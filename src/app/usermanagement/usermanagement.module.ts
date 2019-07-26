import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserManagementComponent } from './usermanagement.component';
import { UserManagementRoutes } from './usermanagement.routing';
import {DialogOverviewExampleDialog} from './usermanagement.component';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(UserManagementRoutes),
  ],
  entryComponents: [
    DialogOverviewExampleDialog
  ],
  providers: [],
  declarations: [UserManagementComponent, DialogOverviewExampleDialog]
})
export class UserManagementModule {}
