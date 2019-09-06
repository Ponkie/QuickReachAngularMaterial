import { ISupplier } from "../../models/ISupplier";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { SupplierService } from "../supplier.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'supplier.addupdatedialog.html',
  })
    
export class SupplierDialog {
    action:string
    constructor(
      public dialogRef: MatDialogRef<SupplierDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ISupplier, private supplierService: SupplierService, private fb: FormBuilder, private snackBar: MatSnackBar) 
      {
        this.supplierData = {...data};
        this.action = this.supplierData.action;
        
        if(this.action == "Update") {
            this.initSupplierForm(false);
        } else {
            this.initSupplierForm(true);
        }
            
       }
  
    ngOnInit() {
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    suppliers: any[];
    errorMsg: string;
    id: number;
    supplierForm: FormGroup;
    supplierData: any = {};
    
    initSupplierForm(newSupplier: boolean) {
      if (newSupplier) {
        this.supplierForm = this.fb.group(
          {
            id: [''],
            name: [''],
            description: [''],
          }
        );
      }
      else {
        this.supplierForm = this.fb.group(
          {
            id: [this.supplierData.id],
            name: [this.supplierData.name],
            description: [this.supplierData.description],
          });
      }
    }
  
    addSupplier() {
      this.setSupplierFormValues(true);
      this.supplierService.addSupplier(this.supplierData)
        .subscribe(data => {
         this.dialogRef.close("added");
        }, error => { this.errorMsg = error });
    }
  
    updateSupplier() {
      this.setSupplierFormValues(false);
      this.supplierService.updateSupplier(this.supplierData)
      .subscribe(data => {
        this.dialogRef.close("updated");
      }, error => { this.errorMsg = error });
      
    }
  
    submitForm(action) {
        if (action == "Add") {
            this.addSupplier();
        }
        else if(action == "Update") {
            this.updateSupplier();
        }
    }
  

  
    setSupplierFormValues(newSupplier: boolean) {

      var formValues = Object.assign({}, this.supplierForm.value);
      
      if (newSupplier) {
        this.supplierData = {};
        this.supplierData.name = formValues['name'];
        this.supplierData.description = formValues['description'];
      } else {
        this.supplierData = {}
        this.supplierData.id = formValues['id'];
        this.supplierData.name = formValues['name'];
        this.supplierData.description = formValues['description'];
      }

    }

  }