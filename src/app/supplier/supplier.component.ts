import { Component, OnInit, Inject, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, PageEvent, MatSlideToggleChange, MatSlideToggle } from '@angular/material';
import { SupplierService } from './supplier.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ISupplier } from '../models/ISupplier';
import { SupplierDialog } from './supplier.dialog/supplier.addupdatedialog.component';
import { SupplierConfirm } from './supplier.dialog/supplier.deleteconfirm.component';

@Component
  ({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.css']
  })

export class SupplierComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'isActive', 'manage'];
  suppliers: any[];
  errorMsg: string;
  id: number;
  supplierForm: FormGroup;
  supplierData: any = {};
  isVisible: boolean = false;
  searchString: string = ""
  dataSource = new MatTableDataSource<ISupplier>(this.suppliers);
  activity = new FormControl();
  displayActivity: string
  pageSize: number;
  pageEvent: PageEvent = new PageEvent();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private supplierService: SupplierService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displaySupplier();
  }

  displaySupplier() {
    this.supplierService.getSupplier().subscribe(supplier => this.suppliers = supplier, error => this.errorMsg = error);
  }

  openDialog(action, supplier:ISupplier) 
  {
    supplier.action = action
    const dialogRef = this.dialog.open(SupplierDialog, 
    {
      width: '500px',
      data: supplier,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.openSnackBar(`Supplier ${result} successfully!` , "Okay");
        this.displaySupplier();
      }
    });
  }

  openConfirm(id: number): void {
    const dialogRef = this.dialog.open(SupplierConfirm,
      {
        width: '250px',
        data: id
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "Success") {
        this.openSnackBar("Supplier successfully deleted!", "Okay");
        this.displaySupplier();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
  
  display() {
    if (this.searchString=="") {
      return this.suppliers
    }
    else {
      return this.suppliers.filter(s => s.name.toLowerCase().includes(this.searchString.toLowerCase()) || s.description.toLowerCase().includes(this.searchString.toLowerCase()));
    }
  }

  pageTurn(event: PageEvent)
  {
    this.pageEvent = event;
    this.pageSize = this.pageEvent.pageSize;
    this.displaySupplier();
  }

  changeActivity(ob: MatSlideToggleChange, supplier: ISupplier)
  {
    supplier.isActive = ob.checked;
    if(ob.checked){
      this.displayActivity = "Active"
    } else {
      this.displayActivity = "Inactive"
    }
    this.supplierService.updateSupplier(supplier)
    .subscribe(data => {
      this.openSnackBar(`Changed ${supplier.name} to ${this.displayActivity} status`, "Okay")
    }, error => { this.errorMsg = error });
  }

  
}




