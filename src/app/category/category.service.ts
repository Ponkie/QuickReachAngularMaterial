import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CategoryService {
    // private proxyUrl:string="https://cors-anywhere-khen.herokuapp.com/";
    private url: string = "https://localhost:5001/api/categories/";

    constructor(private http: HttpClient) { }

    getCategory(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            catchError(this.errorHandler));
    }

    addCategory(category: any): Observable<any> {
        return this.http.post<any[]>(this.url, category)
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

}