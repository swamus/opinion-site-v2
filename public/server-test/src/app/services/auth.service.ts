import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
    ) {}

    //TODO: Figure out how the fuck error handling works and clean it up

    private handleError=function(error : HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.');
      }


    saveToken=function(token){
      localStorage.setItem('opinion-site token',token);
    }

    getToken=function(){
        return localStorage.getItem('opinion-site token');
    }

    isLoggedIn = function(){
        var token=this.getToken();

        if (token){
            var payload = JSON.parse(atob(token.split('.')[1]));

            return payload.exp>Date.now()/1000;
        } else {
            return false;
        }
    };

    currentUser=function(){
        if (this.isLoggedIn()){
            var token=this.getToken();
            var payload = JSON.parse(atob(token.split('.')[1]));

            return payload.username;
        }
    };

    register=function(user){
        return this.http.post('/api/register',user)
        .pipe(
            catchError(this.handleError)
        );
        
        //.success(function(data){
        //    this.saveToken(data.token);
        //});
    };

    logIn=function(user){
        return this.http.post('/api/login',user)
        .pipe(
            catchError(this.handleError)
        );
        // .success(function(data){
        //     this.saveToken(data.token);
        //^^^Original code; rewriting so the "success" portion happens in the login component as a subscription
        //});
    };

    logOut=function(){
        localStorage.removeItem('opinion-site token');
    };

}
