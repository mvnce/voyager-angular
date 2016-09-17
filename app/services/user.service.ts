/**
 * Created by vincentma on 8/17/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class UserService {
    private _url = "http://localhost:8080/api/v1/user";

    constructor(private _http: Http) { }

    private getUrl(type: string) {
        return this._url + "/" + type;
    }

    private extractData(res: Response) {
        console.log('res service: ', res);
        let body = res.json();
        console.log('body service: ', body);
        return body.data || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error('123456789', errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
