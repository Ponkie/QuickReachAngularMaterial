import { ICategory } from "../../models/ICategory";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { CategoryService } from "../category.service";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
    selector: 'delete-confirm',
    templateUrl: 'category.deleteconfirm.html',
  })
  
export class CategoryConfirm {
    constructor(
      public dialogRef: MatDialogRef<CategoryConfirm>, private categoryService: CategoryService, private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: number,
    ) { }
  
    errorMsg: string;
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onConfirm() {
      this.deleteCategory(this.data);
    }
    
    deleteCategory(id: number) {
      this.categoryService.deleteCategory(id)
        .subscribe(data => {
          this.dialogRef.close("Success");
        }, error => {this.errorMsg = error});
    }
  
  }