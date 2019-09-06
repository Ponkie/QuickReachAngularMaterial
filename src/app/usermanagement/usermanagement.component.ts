import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserManagementDialog } from './usermanagement.dialog/usermanagement.dialog.component';
import { IUser } from '../models/IUser';
import { UserService } from './usermanagement.service';
import { errorHandler } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UserManagementComponent {
  action: string;
  users: any[];
  userData: any = {};
  errorMsg: string;
  searchString: string;
  constructor(private dialog: MatDialog, private userService: UserService) { }

  ngOnInit()
  {
    this.displayUsers()
  }
  openDialog(action, user: IUser): void 
    {
    user.action = action;
    const dialogRef = this.dialog.open(UserManagementDialog, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
    });
  }

  displayUsers() {
    if (this.searchString=="") {
      return this.users
    } else {
    this.userService.getUsers()
      .subscribe(user => this.users = user, 
                 error => this.errorMsg = error);
      }
  }



  
  //this.productService.getProducts().subscribe(product => this.products = product, error => this.errorMsg = error);
}



