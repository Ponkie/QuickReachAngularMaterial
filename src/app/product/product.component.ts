import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface ProductList {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

const ELEMENT_DATA: ProductList[] = [
  { id: 1, name: 'UltraBoost 4.0', description: "Legend Ink", price: 20, imageUrl: 'https://shoeengine.com/wp-content/uploads/2018/01/adidas-ultra-boost-4-0-carbon-cp9250.jpg' },
  { id: 2, name: 'Yeezy Boost 350 V2', description: "Hyperspace", price: 20, imageUrl: 'https://rukminim1.flixcart.com/image/704/704/juu4jgw0/shoe/a/h/n/original-addas-yeezy-boost-350-v2-700-v2-8-yeezy-sports-natural-original-imaffubzafk7fw94.jpeg?q=70' },
  { id: 3, name: 'Air Jordan 1 Retro High', description: "Spider-Man", price: 20, imageUrl: 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/fjnwgckb93fgp54v70vi/air-jordan-1-origin-story-release-date.jpg' },
  { id: 4, name: 'Lenovo Y570', description: "Gaming Laptop", price: 20, imageUrl: 'https://d2pa5gi5n2e1an.cloudfront.net/global/images/product/laptops/Lenovo_Ideapad_Y570/Lenovo_Ideapad_Y570_L_1.jpg' },
  { id: 5, name: 'Iphone 6S', description: "Apple Smartphone", price: 20, imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61%2BmrwyL24L._SL1000_.jpg' },
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  displayedColumns: string[] = ['imageUrl', 'id', 'name', 'description', 'price', 'active', 'manage'];
  dataSource = ELEMENT_DATA;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void 
    {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
    }); 

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

