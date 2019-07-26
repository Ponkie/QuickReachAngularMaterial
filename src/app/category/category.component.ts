import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from './category.service'
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CategoryList {
  id: number;
  name: string;
  description: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

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
  id:number;
  categoryForm: FormGroup;
  categoryAdd: any = {};
  isVisible: boolean = false;
  mode: string = "Add";


  ngOnInit()
  {
    this.initCategoryForm(true);
    this.displayCategory();
  }
  
  constructor(private dialog: MatDialog, private categoryService: CategoryService, private fb: FormBuilder, ) { }

  displayCategory() 
  {
    this.categoryService.getCategory().subscribe(category => this.categories = category, error => this.errorMsg = error);
  }

  initCategoryForm(newCategory: boolean) {
    if (newCategory)
    {
      this.categoryForm = this.fb.group(
        {
          id: [''],
          name: [''],
          description: [''],
          isActive: [''],
        }
      );
    }
    else
    {
      this.categoryForm = this.fb.group(
        {
        id: [this.categoryAdd.id],
        name: [this.categoryAdd.name],
        description: [this.categoryAdd.description],
        isactive: [this.categoryAdd.isActive]
      });
    }
  }

  addCategory()
  {
    this.setCategoryFormValues(true);
    console.log(this.categoryAdd);
    this.categoryService.addCategory(this.categoryAdd)
    .subscribe(data =>
      {
        this.initCategoryForm(true);
        this.displayCategory();
      }, error=> {this.errorMsg = error});
  }

  submitForm()
  {
    if (this.mode == "Add")
    {
      this.addCategory();
    }
  }

  setCategoryFormValues(newCategory: boolean)
  {
    const formValues = Object.assign({}, this.categoryForm.value);
    if (newCategory)
    {
      this.categoryAdd = {};
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
    }

  }

    openDialog(): void 
    {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',    
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
      this.displayCategory();
    });
    }

    openConfirm(id: number): void 
    {
    const dialogRef = this.dialog.open(DeleteConfirm,
    {
      width: '250px', 
      data: id
    });

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
      if (result != undefined)
      {
        this.deleteCategory(result);
        alert("Category successfully Deleted!")      
        this.displayCategory();

      }
      this.displayCategory();
    });
    }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => data, error => this.errorMsg = error);
    this.displayCategory();

  }

  
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})

export class DialogOverviewExampleDialog 
{
  
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private categoryService: CategoryService, private fb: FormBuilder ) { }

    
  ngOnInit()
  {
    this.initCategoryForm(true);
    this.displayCategory();
  }

  onNoClick(): void 
  {
    this.dialogRef.close();
  }

  categories: any[];
  errorMsg: string;
  id:number;
  categoryForm: FormGroup;
  categoryAdd: any = {};
  isVisible: boolean = false;
  mode: string = "Add";


  displayCategory() 
  {
    this.categoryService.getCategory().subscribe(category => this.categories = category, error => this.errorMsg = error);
  }

  initCategoryForm(newCategory: boolean) {
    if (newCategory)
    {
      this.categoryForm = this.fb.group(
        {
          id: [''],
          name: [''],
          description: [''],
          isActive: [''],
        }
      );
    }
    else
    {
      this.categoryForm = this.fb.group(
        {
        id: [this.categoryAdd.id],
        name: [this.categoryAdd.name],
        description: [this.categoryAdd.description],
        isactive: [this.categoryAdd.isActive]
      });
    }
  }

  addCategory()
  {
    this.setCategoryFormValues(true);
    console.log(this.categoryAdd);
    this.categoryService.addCategory(this.categoryAdd)
    .subscribe(data =>
      {
        this.initCategoryForm(true);
        this.displayCategory();
      }, error=> {this.errorMsg = error});
      this.dialogRef.close();
  }

  submitForm()
  {
    if (this.mode == "Add")
    {
      this.addCategory();
    }
  }

  setCategoryFormValues(newCategory: boolean)
  {
    const formValues = Object.assign({}, this.categoryForm.value);
    if (newCategory)
    {
      this.categoryAdd = {};
      this.categoryAdd.name = formValues['name'];
      this.categoryAdd.description = formValues['description'];
    }

    }
}

@Component({
  selector: 'delete-confirm',
  templateUrl: 'confirm.html',
})

export class DeleteConfirm
{ 
  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteConfirm>,
    @Inject(MAT_DIALOG_DATA) public data: number, 
    ) { }

    onNoClick(): void 
    {
      this.dialogRef.close();
    }

    onConfirm()
    {
      this.dialogRef.close(this.data);
    }
    
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

}

