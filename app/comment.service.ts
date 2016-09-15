/**
 * Created by vincentma on 9/12/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Comment } from './comment';

import { Observable }     from 'rxjs/Observable';

@Injectable()
export class CommentService {
    private _url = 'http://104.131.139.229:8080/api/v1/comments';
    // private _url = 'http://localhost:8080/api/v1/comments';

    constructor(private _http: Http) {}

    private getCommentUrl(id) {
        return this._url + '/' + id;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    getComments(post_id: number): Observable<any> {
        return this._http.get(this.getCommentUrl(post_id))
            .map(this.extractData)
            .catch(this.handleError);
    }

    addComment(comment: Comment): Observable<any> {
        let body = JSON.stringify(comment);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}