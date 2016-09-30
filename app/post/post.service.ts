/**
 * Created by vincentma on 9/9/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Post } from '../models/post';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class PostService {
    private url: string;

    constructor(private _http: Http,
                private _router: Router,
                private _authenticationService: AuthenticationService) {
        // this.url = 'http://104.131.139.229:8080/api/v1/post';
        this.url = 'http://127.0.0.1:8080/api/v1/post';
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        this._router.navigate(['account/signin']);
        return Observable.throw(errMsg);
    }

    getPosts(): Observable<any[]> {
        let headers = new Headers({
            'Authorization': 'Bearer '+ this._authenticationService.getToken()
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.url+'s', options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addPost(post: Post): Observable<any> {
        let body = JSON.stringify(post);
        let headers = new Headers({
            'Authorization': 'Bearer '+ this._authenticationService.getToken(),
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getPost(id: number): Observable<any> {
        let headers = new Headers({
            'Authorization': 'Bearer '+ this._authenticationService.getToken()
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.url+'/'+id, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deletePost(id: number): Observable<any> {
        return this._http.delete(this.url+'/'+id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    updatePost(id: number, post: Post): Observable<any> {
        let body = JSON.stringify(post);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this.url+'/'+id, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
