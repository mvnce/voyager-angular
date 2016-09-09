/**
 * Created by vincentma on 9/9/16.
 */

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ThreadService {
    private _url = "http://104.131.139.229:8080/api/v1/posts";

    constructor(private _http: Http) { }

    getThreads() {
        return this._http.get(this._url).map(res => res.json());
    }

}
