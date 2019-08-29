import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogData } from "../../usermanagement/usermanagement.component";

@Component({
    selector: 'product-dialog',
    templateUrl: 'product.dialog.html',
  })
  
  export class ProductDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ProductDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }
  