import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { ProductDialog } from './product.dialog/product.dialog';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  displayedColumns: string[] = ['imageUrl', 'id', 'name', 'description', 'price', 'active', 'manage'];
  errorMsg: any;
  products: any[];
  
  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private productService: ProductService) { }

  ngOnInit() {
    this.displayProducts()
  }
  
  openDialog(): void 
    {
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '40%',
    }); 

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
      this.openSnackBar("Product successfully added!", "Okay")
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  displayProducts() {
    this.productService.getProducts().subscribe(product => this.products = product, error => this.errorMsg = error);
  }
}


