import { ISupplier } from "../../models/ISupplier";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { SupplierService } from "../supplier.service";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
    selector: 'delete-confirm',
    templateUrl: 'supplier.deleteconfirm.html',
  })
  
export class SupplierConfirm {
    constructor(
      public dialogRef: MatDialogRef<SupplierConfirm>, private supplierService: SupplierService, private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: number,
    ) { }
  
    errorMsg: string;
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onConfirm() {
      this.deleteSupplier(this.data);
    }
    
    deleteSupplier(id: number) {
      this.supplierService.deleteSupplier(id)
        .subscribe(data => {
          this.dialogRef.close("Success");
        }, error => {this.errorMsg = error});
    }

  
  }