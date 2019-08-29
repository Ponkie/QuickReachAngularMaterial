import { ICategory } from "../../models/ICategory";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { CategoryService } from "../category.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'category.addupdatedialog.html',
  })
    
export class CategoryDialog {

    action:string
    constructor(
      public dialogRef: MatDialogRef<CategoryDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ICategory, private categoryService: CategoryService, private fb: FormBuilder, private snackBar: MatSnackBar) 
      {
        this.categoryData = {...data};
        this.action = this.categoryData.action;
        
        if(this.action == "Update") {
            this.initCategoryForm(false);
        } else {
            this.initCategoryForm(true);
        }
            
       }
  
    ngOnInit() {
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    categorys: any[];
    errorMsg: string;
    id: number;
    categoryForm: FormGroup;
    categoryData: any = {};
    isVisible: boolean = false;
  
    displayCategory() {
      this.categoryService.getCategory().subscribe(category => this.categorys = category, error => this.errorMsg = error);
    }
  
    initCategoryForm(newCategory: boolean) {
      if (newCategory) {
        this.categoryForm = this.fb.group(
          {
            id: [''],
            name: [''],
            description: [''],
          }
        );
      }
      else {
        this.categoryForm = this.fb.group(
          {
            id: [this.categoryData.id],
            name: [this.categoryData.name],
            description: [this.categoryData.description],
          });
      }
    }
  
    addCategory() {
      this.setCategoryFormValues(true);
      this.categoryService.addCategory(this.categoryData)
        .subscribe(data => {
         this.dialogRef.close("added");
        }, error => { this.errorMsg = error });
    }
  
    updateCategory() {
      this.setCategoryFormValues(false);
      this.categoryService.updateCategory(this.categoryData)
      .subscribe(data => {
        this.dialogRef.close("updated");
      }, error => { this.errorMsg = error });
      
    }
  
    submitForm(action) {
        if (action == "Add") {
            this.addCategory();
        }
        else if(action == "Update") {
            this.updateCategory();
        }
    }
  

  
    setCategoryFormValues(newCategory: boolean) {

      var formValues = Object.assign({}, this.categoryForm.value);
      
      if (newCategory) {
        this.categoryData = {};
        this.categoryData.name = formValues['name'];
        this.categoryData.description = formValues['description'];
      } else {
        this.categoryData = {}
        this.categoryData.id = formValues['id'];
        this.categoryData.name = formValues['name'];
        this.categoryData.description = formValues['description'];
      }

    }

  }