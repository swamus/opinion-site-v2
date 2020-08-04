import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) { }

  //TODO: Figure out how the fuck error handling works and clean it up

  private handleError = function (error: HttpErrorResponse) {
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


  //posts=[]

  getAllPro = function () {
    return this.http.get('/api/posts-pro')
      .pipe(
        catchError(this.handleError)
      );
  };

  getAllCon = function () {
    return this.http.get('/api/posts-con')
      .pipe(
        catchError(this.handleError)
      );
  };

  create = function (post) {
    return this.http.post('/api/posts', post, {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() }
    }).pipe(
      catchError(this.handleError)
    );
  };

  //Upvote posts
  //
  upvotePost = function (post, vote) {
    return this.http.put('/api/posts/' + post._id.toString() + '/upvote', vote, {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() }
    }).pipe(
      catchError(this.handleError)
    );
  };

  get = function (id) {
    return this.http.get('/api/posts/' + id)
      .pipe(
        catchError(this.handleError)
      );
  };

  addComment = function (id, comment) {
    return this.http.post('/api/posts/' + id + '/comments', comment, {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() }
    })
      .pipe(
        catchError(this.handleError)
      );
    //This returns an object with 'success:true', 'data:newComment', and 'existingPost' (the post it's attached to)
  };

  //Upvote Comments
  //
  upvoteComment = function (postId, comment, vote) {
    return this.http.put('/api/posts/' + postId + '/comments/' + comment._id + '/upvote', vote, {
      headers: { Authorization: 'Bearer ' + this.auth.getToken() }
    })
      .pipe(
        catchError(this.handleError)
      );

    // .success(function(data){
    //     comment.upvotes+=1;
    // });
  };

}
