import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProduct } from '../models/IProduct';
import { IProductCategory } from '../models/IProductCategory';
import { ICategory } from '../models/ICategory';

@Injectable()
export class ProductService {
    private url: string = "https://localhost:5001/api/products/";
    private url2: string = "/categories"

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            catchError(this.errorHandler));
    }

    addProduct(product: IProduct): Observable<IProduct> {
        return this.http.post<IProduct>(this.url, product).pipe(
            catchError(this.errorHandler));
    }

    updateProduct(product: IProduct): Observable<IProduct> {
        return this.http.put<IProduct>(this.url + product.id, product).pipe(
            catchError(this.errorHandler));
    }
    deleteProduct(id: number): Observable<any> {
        return this.http.delete<any[]>(this.url + id)
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "Server Error")
        //if error message is  null throws server error
    }

    getProductCategory(id: number): Observable<any> {
        return this.http.get<any[]>(this.url+id+this.url2)
            .pipe(catchError(this.errorHandler));
    }

}