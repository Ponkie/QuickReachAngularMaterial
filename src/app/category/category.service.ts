import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICategory } from '../models/ICategory';
import { IProduct } from '../models/IProduct';
import { IProductCategory } from '../models/IProductCategory';

@Injectable()
export class CategoryService {
    // private proxyUrl:string="https://cors-anywhere-khen.herokuapp.com/";
    private url: string = "https://localhost:5001/api/categories/";
    private url2: string = "/products/"

    constructor(private http: HttpClient) { }

    getCategory(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            catchError(this.errorHandler));
    }

    addCategory(category: ICategory): Observable<any> {
        return this.http.post<any[]>(this.url, category)
            .pipe(catchError(this.errorHandler));
    }

    updateCategory(category: ICategory): Observable<any> {
        return this.http.put<any[]>(this.url+category.id, category)
            .pipe(catchError(this.errorHandler));
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any[]>(this.url+id)
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "Server Error")
        //if error message is  null throws server error
    }

    addProductCategory(productCategory:IProductCategory, categoryId: number): Observable<IProductCategory> {
        return this.http.put<IProductCategory>(this.url+categoryId+this.url2, productCategory)
            .pipe(catchError(this.errorHandler));
    }

    deleteProductCategory(productId:number, categoryId:number): Observable<any> {
        return this.http.delete<any[]>(this.url+categoryId+this.url2+productId) 
            .pipe(catchError(this.errorHandler));
    }

    getProductCategory(id: number): Observable<any> {
        return this.http.get<any[]>(this.url+id+this.url2)
            .pipe(catchError(this.errorHandler));
    }

}