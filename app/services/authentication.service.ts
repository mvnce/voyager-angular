/**
 * Created by Vincent on 9/17/2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { SignInForm, SignUpForm } from '../models/forms';

@Injectable()
export class AuthenticationService {
    public token: string;
    private url = 'http://104.131.139.229:8080/api/v1/auth';

    constructor(private _http: Http) {
        var authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
        this.token = authenticatedUser && authenticatedUser.token;
    }

    private getUrl(pathname: string) {
        return this.url + '/' + pathname;
    }

    private extractData(res: Response) {
        let body = res.json();
        let token = body.data['token'];

        if (token) {
            localStorage.setItem('authenticatedUser', JSON.stringify(body.data));
            return true;
        }
        else {
            return false;
        }
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    signUp(form: SignUpForm) {
        let body = JSON.stringify(form);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.getUrl('signup'), body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    signIn(form: SignInForm): Observable<boolean> {
        let body = JSON.stringify(form);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.getUrl('signin'), body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    signOut(): void {
        this.token = null;
        localStorage.removeItem('authenticatedUser');
    }
}
