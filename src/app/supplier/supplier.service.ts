import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISupplier } from '../models/ISupplier';

@Injectable()
export class SupplierService {
    // private proxyUrl:string="https://cors-anywhere-khen.herokuapp.com/";
    private url: string = "https://localhost:5001/api/suppliers/";

    constructor(private http: HttpClient) { }

    getSupplier(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            catchError(this.errorHandler));
    }

    addSupplier(supplier: ISupplier): Observable<ISupplier> {
        return this.http.post<ISupplier>(this.url, supplier)
            .pipe(catchError(this.errorHandler));
    }

    updateSupplier(supplier: ISupplier): Observable<ISupplier>{
        return this.http.put<ISupplier>(this.url+supplier.id, supplier)
            .pipe(catchError(this.errorHandler));
    }

    deleteSupplier(id: number): Observable<any> {
        return this.http.delete<any[]>(this.url+id)
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "Server Error")
        //if error message is  null throws server error
    }

}