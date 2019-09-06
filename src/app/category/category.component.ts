import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, PageEvent, MatSlideToggleChange } from '@angular/material';
import { CategoryService } from './category.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from '../models/ICategory';
import { CategoryDialog } from './category.dialog/category.addupdatedialog.component';
import { CategoryConfirm } from './category.dialog/category.deleteconfirm.component';

@Component
  ({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
  })

export class CategoryComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'isActive', 'manage'];
  categories: any[];
  errorMsg: string;
  id: number;
  categoryForm: FormGroup;
  categoryData: any = {};
  isVisible: boolean = false;
  searchString: string = ""
  displayActivity: string;
  dataSource = new MatTableDataSource<ICategory>(this.categories);
  pageSize: number;
  pageEvent: PageEvent = new PageEvent();
  categoriesLength: number = 7;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private categoryService: CategoryService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.displayCategory();
    this.dataSource.paginator = this.paginator;
  }

  displayCategory() {
    this.categoryService.getCategory().subscribe(category => this.categories = category, error => this.errorMsg = error);
  }

  setCategoryFormValues(newCategory: boolean) {
    const formValues = Object.assign({}, this.categoryForm.value);
    if (newCategory) {
      this.categoryData = {};
      this.categoryData.name = formValues['name'];
      this.categoryData.description = formValues['description'];
    }

  }

  openDialog(action, category: ICategory) {
    category.action = action
    const dialogRef = this.dialog.open(CategoryDialog,
      {
        width: '500px',
        data: category,
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.openSnackBar(`Category ${result} successfully!`, "Okay");
        this.displayCategory();
      }
    });
  }

  openConfirm(id: number): void {
    const dialogRef = this.dialog.open(CategoryConfirm,
      {
        width: '250px',
        data: id
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result == "Success") {
        this.openSnackBar("Category successfully deleted!", "Okay");
        this.displayCategory();
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  display() {
    if (this.searchString == "") {
      return this.categories;
    } else {
      return this.categories.filter(c => c.name.toLowerCase().includes(this.searchString.toLowerCase()) || c.description.toLowerCase().includes(this.searchString.toLowerCase()));
    }
  }

  changeActivity(ob: MatSlideToggleChange, category: ICategory) {
    category.isActive = ob.checked;
    if (ob.checked) {
      this.displayActivity = "Active"
    } else {
      this.displayActivity = "Inactive"
    }
    this.categoryService.updateCategory(category)
      .subscribe(data => {
        this.openSnackBar(`Changed ${category.name} to ${this.displayActivity} status`, "Okay")
      }, error => { this.errorMsg = error });
  }
}




