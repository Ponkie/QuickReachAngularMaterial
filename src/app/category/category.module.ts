import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CategoryComponent } from './category.component';
import { CategoryRoutes } from './category.routing';
import { CategoryService} from './category.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { CategoryConfirm } from './category.dialog/category.deleteconfirm.component';
import { CategoryDialog } from './category.dialog/category.addupdatedialog.component';
@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule.forChild(CategoryRoutes),
    FormsModule
  ],
  entryComponents: [
    CategoryDialog, CategoryConfirm
  ],
  providers: [CategoryService],
  declarations: [CategoryComponent, CategoryDialog, CategoryConfirm]
})
export class CategoryModule {}
