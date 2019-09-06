import { IProduct } from "../../models/IProduct";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Inject, Component } from "@angular/core";
import { ProductService } from "../product.service";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { CategoryService } from "../../category/category.service";
import { ICategory } from "../../models/ICategory";
import { IProductCategory } from "../../models/IProductCategory";
import { BreakpointObserver } from "@angular/cdk/layout";
import { initChangeDetectorIfExisting } from "@angular/core/src/render3/instructions";

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'product.addupdatedialog.html',
})

export class ProductDialog {
  action: string
  constructor(
    public dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IProduct, private productService: ProductService, private fb: FormBuilder, private snackBar: MatSnackBar, private categoryService: CategoryService) {
    this.productData = { ...data };
    this.action = this.productData.action;

    if (this.action == "Update") {
      this.initProductForm(false);
    } else {
      this.initProductForm(true);
    }

  }

  ngOnInit() {
    this.getCategories()
    this.getProductCategory(this.productData.id)

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  products: any[];
  errorMsg: string;
  id: number;
  productForm: FormGroup;
  productData: any = {};
  categories: any[];
  exist: boolean = false;
  selectedOptions: any
  oldProductCategories: any[] = [];
  newProductCategories: any[];
  productCategories: any[] = [];
  initProductForm(newProduct: boolean) {
    if (newProduct) {
      this.productForm = this.fb.group(
        {
          id: [''],
          name: [''],
          description: [''],
          price: [''],
          imageUrl: [''],
          categories: ['']
        }
      );
    }
    else {
      this.productForm = this.fb.group(
        {
          id: [this.productData.id],
          name: [this.productData.name],
          description: [this.productData.description],
          price: [this.productData.price],
          imageUrl: [this.productData.imageUrl],
          categories: [this.productData.categories]
        });
    }
  }

  addProduct() {
    this.setProductFormValues(true);
    this.productService.addProduct(this.productData)
      .subscribe(data => {
        this.dialogRef.close("added");
      }, error => { this.errorMsg = error });
  }

  updateProduct() {
    this.setProductFormValues(false);
    var categories = this.productData.categories
    this.productService.updateProduct(this.productData)
      .subscribe(data => {
        this.updateProductCategories(data, categories)
        this.dialogRef.close("updated")
      }, error => { this.errorMsg = error });
  }

  updateProductCategories(product: IProduct, categories: any[]) {
    var exists: boolean;
    var productCategories = <IProductCategory>{}
    for (var pc in this.oldProductCategories) {
      exists = categories.includes(this.oldProductCategories[pc])
      if (exists) {
        categories = this.arrayRemove(categories, this.oldProductCategories[pc])
      }
      else {
        this.categoryService.deleteProductCategory(product.id, this.oldProductCategories[pc])
          .subscribe(error => this.errorMsg = error)
      }
    }
    categories.forEach(c => {
      productCategories.productId = product.id;
      productCategories.categoryId = c;
      console.log(productCategories)
      this.categoryService.addProductCategory(productCategories, c)
        .subscribe(data => {console.log(data), error => this.errorMsg = error})   
    })
  }





  getProductCategory(productId: number) {
    this.productService.getProductCategory(productId)
      .subscribe(productCategory => {
        productCategory.forEach(pc => this.oldProductCategories.push(pc.categoryId.toString()))
        this.setCurrentCategories(this.oldProductCategories)
      }, error => this.errorMsg = error);
  }

  setCurrentCategories(category: any) {
    this.productForm.controls['categories'].setValue(category)
  }

  submitForm(action) {
    if (action == "Add") {
      this.addProduct();
    }
    else if (action == "Update") {
      this.updateProduct();
    }
  }

  getCategories() {
    this.categoryService.getCategory().subscribe(category => this.categories = category, error => this.errorMsg = error);
  }

  setProductFormValues(newProduct: boolean) {
    var formValues = Object.assign({}, this.productForm.value);
    if (newProduct) {
      this.productData = {};
      this.productData.name = formValues['name'];
      this.productData.description = formValues['description'];
      this.productData.price = formValues['price'];
      this.productData.imageUrl = formValues['imageUrl'];
      this.productData.categories = formValues['categories'];
    } else {
      this.productData = {}
      this.productData.id = formValues['id'];
      this.productData.name = formValues['name'];
      this.productData.description = formValues['description'];
      this.productData.price = formValues['price'];
      this.productData.imageUrl = formValues['imageUrl'];
      this.productData.categories = formValues['categories']
    }



  }

  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });

  }
}