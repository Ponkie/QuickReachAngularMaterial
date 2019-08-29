import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable,throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { IProduct } from '../models/IProduct';

@Injectable()
export class ProductService{
    private url:string="https://localhost:5001/api/products/";

    constructor(private http: HttpClient){}

    getProducts(): Observable<any[]>
    {
        return this.http.get<any[]>(this.url).pipe(
            catchError(this.errorHandler));
    }

    addProduct(product: IProduct): Observable<any[]>
    {
        return this.http.post<any[]>(this.url,product).pipe(
            catchError(this.errorHandler));
    }
    
    deleteProduct(id: number): Observable<any> 
    {
        return this.http.delete<any[]>(this.url+id)
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse)
    {
        return throwError(error.message || "Server Error")
        //if error message is  null throws server error
    }

}