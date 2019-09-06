import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../models/IUser';

@Injectable()
export class UserService {
    private url: string = "https://localhost:5001/api/users/";

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.url).pipe(
            catchError(this.errorHandler));
    }
    addUser(user: IUser): Observable<IUser> {
        return this.http.post<IUser>(this.url, user).pipe(
            catchError(this.errorHandler));
    }
    updateUser(user: IUser): Observable<IUser> {
        return this.http.put<IUser>(this.url + user.id, user).pipe(
            catchError(this.errorHandler));
    }
    deleteUser(id: number): Observable<any> {
        return this.http.delete<any[]>(this.url + id)
            .pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || "Server Error")
        //if error message is  null throws server error
    }

}