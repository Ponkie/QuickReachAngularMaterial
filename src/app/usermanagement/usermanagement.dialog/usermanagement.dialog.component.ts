import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { IUser } from "../../models/IUser";
import { UserService } from "../usermanagement.service";

@Component({
  selector: 'usermanagement-dialog',
  templateUrl: 'usermanagement.dialog.html',
})

export class UserManagementDialog {

  userData:any = {};
  errorMsg: string;
  constructor(
    public dialogRef: MatDialogRef<UserManagementDialog>, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: IUser) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser() {
    this.userService.addUser(this.userData)
      .subscribe(data => {
        this.dialogRef.close("added");
      }, error => { this.errorMsg = error });

  }

  submitForm(action) {
    if (action == "Add") {
      this.addUser()
    }
  }
}