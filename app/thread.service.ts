/**
 * Created by vincentma on 9/9/16.
 */

import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Thread} from "./thread";
import {Observable} from "rxjs";

@Injectable()
export class ThreadService {
    private _url = "http://104.131.139.229:8080/api/v1/posts";

    constructor(private _http: Http) { }

    getThreads() {
        return this._http.get(this._url).map(res => res.json());
    }

    addThread(thread: Thread): Observable<Thread> {
        console.log("add thread service log");

        let body = JSON.stringify(thread);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }
    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
