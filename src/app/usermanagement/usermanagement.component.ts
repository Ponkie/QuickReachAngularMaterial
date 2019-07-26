import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


export interface UserManagementList {
  id: number;
  name: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

const ELEMENT_DATA: UserManagementList[] = [
  { id: 1, name: 'UltraBoost 4.0',},
  { id: 2, name: 'Yeezy Boost 350 V2' },
  { id: 3, name: 'Air Jordan 1 Retro High',  },
  { id: 4, name: 'Lenovo Y570' },
  { id: 5, name: 'Iphone 6S'}
];

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UserManagementComponent {
  

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

