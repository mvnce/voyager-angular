/**
 * Created by Vincent Ma on 9/9/16.
 */

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Post } from '../models/post';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PostService {
  private url: string;

  constructor (private _httpClient: HttpClient,
               private _router: Router,
               private _authenticationService: AuthenticationService) {
    // this.url = 'http://104.131.139.229:8080/api/v1/post';
    this.url = 'http://127.0.0.1:8080/api/v1/post';
  }

  getPosts (): Observable<any[]> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this._authenticationService.getToken()
    });
    let httpOptions = {
      headers: headers
    };

    return this._httpClient.get(this.url + 's', httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  addPost (post: Post): Observable<any> {
    let body = JSON.stringify(post);
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this._authenticationService.getToken(),
      'Content-Type': 'application/json'
    });
    let httpOptions = {headers: headers};

    return this._httpClient.post(this.url, body, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPost (id: number): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this._authenticationService.getToken()
    });
    let options = {headers: headers};

    return this._httpClient.get(this.url + '/' + id, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  deletePost (id: number): Observable<any> {
    return this._httpClient.delete(this.url + '/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  updatePost (id: number, post: Post): Observable<any> {
    let body = JSON.stringify(post);
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    let options = {headers: headers};

    return this._httpClient.put(this.url + '/' + id, body, options).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  private extractData (res: any): any {
    let body = res.json();
    return body.data || {};
  }

  private handleError (error: any): any {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    this._router.navigate(['account/signin']);
    return throwError(errMsg);
  }
}
