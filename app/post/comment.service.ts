/**
 * Created by Vincent Ma on 9/12/16.
 */

import { Injectable } from '@angular/core';

import { Comment } from '../models/comment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CommentService {
  // private _url = 'http://104.131.139.229:8080/api/v1/comments';
  private url = 'http://localhost:8080/api/v1/comments';

  constructor (private _httpClient: HttpClient) {
  }

  getComments (post_id: number): Observable<any> {
    return this._httpClient.get(this.getCommentUrl(post_id))
      .pipe(map((res: any) => {
        let body = res.json();
        return body.data || {};
      }), catchError(this.handleError));
  }

  addComment (comment: Comment): Observable<any> {
    let body = JSON.stringify(comment);
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this._httpClient.post(this.url, body, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  private getCommentUrl (id): any {
    return this.url + '/' + id;
  }

  private extractData (res: Response): any {
    let body: any = res.json();
    return body.data || {};
  }

  private handleError (error: any): any {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }
}
