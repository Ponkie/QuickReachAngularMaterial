import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSlideToggle, MatSlideToggleChange } from '@angular/material';
import { ProductDialog } from './product.dialog/product.addupdatedialog';
import { ProductService } from './product.service';
import { IProduct } from '../models/IProduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  searchString: string
  displayedColumns: string[] = ['imageUrl', 'id', 'name', 'description', 'price', 'active', 'manage'];
  errorMsg: any;
  products: any[];
  displayActivity: string
  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private productService: ProductService) { }

  ngOnInit() {
    this.displayProducts()
  }

  openDialog(action, product: IProduct): void {
    product.action = action
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '40%',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.openSnackBar(`Product successfully ${result}!`, "Okay");
        this.displayProducts();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  displayProducts() {
    if (this.searchString=="") {
      return this.products
    } else {
      this.productService.getProducts().subscribe(product => this.products = product, error => this.errorMsg = error);
    }
    
  }

  changeActivity(value: MatSlideToggleChange, product: IProduct) {
    if (value.checked) {
      this.displayActivity = "Active"
    } else {
      this.displayActivity = "Inactive"
    }
    product.isActive = value.checked;
    this.productService.updateProduct(product)
      .subscribe(data => { 
        this.openSnackBar(`Changed ${product.name} to ${this.displayActivity} status`, "Okay")
      }, error => { this.errorMsg = error });

  }


}


