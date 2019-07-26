import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { DialogOverviewExampleDialog} from './category.component';
import { CategoryService} from './category.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import {DeleteConfirm} from './category.component'
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(CategoryRoutes),
  ],
  entryComponents: [
    DialogOverviewExampleDialog, DeleteConfirm
  ],
  providers: [CategoryService],
  declarations: [CategoryComponent, DialogOverviewExampleDialog, DeleteConfirm]
})
export class CategoryModule {}
