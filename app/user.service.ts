/**
 * Created by vincentma on 8/17/16.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import { SignUpForm } from './forms';

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

    SignUp(signupForm: SignUpForm) {
        let body = JSON.stringify(signupForm);
        console.log('user service: ', body);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.getUrl('signup'), body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
