/**
 * Created by vincentma on 9/9/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { Thread } from './thread';

@Injectable()
export class ThreadService {
    // private _url = 'http://104.131.139.229:8080/api/v1/posts';
    private _url = 'http://localhost:8080/api/v1/posts';

    constructor(private _http: Http) { }

    private getThreadUrl(id) {
        return this._url + "/" + id;
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

    getThreads(): Observable<any[]> {
        return this._http.get(this._url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addThread(thread: Thread): Observable<any> {
        let body = JSON.stringify(thread);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this._url, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getThread(id: number): Observable<any> {
        return this._http.get(this.getThreadUrl(id))
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteThread(id: number): Observable<any> {
        return this._http.delete(this.getThreadUrl(id))
            .map(this.extractData)
            .catch(this.handleError);
    }

    updateThread(id: number, thread: Thread): Observable<any> {
        let body = JSON.stringify(thread);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(this.getThreadUrl(id), body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
