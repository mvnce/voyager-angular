/**
 * Created by Vincent on 9/17/2016.
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { SignInForm, SignUpForm } from '../models/forms';
import { tokenNotExpired } from 'angular2-jwt';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthenticationService {
    lock = new Auth0Lock('YGRy3khHAVSDkK5B9DR2PcnN4RdxCkb7', 'vinceeema.auth0.com', {});
    private url: string;

    constructor(private _http: Http) {
        this.url = 'http://127.0.0.1:8080/api/v1/auth';
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
    };

    private getUrl(pathname: string) {
        return this.url + '/' + pathname;
    }

    private extractData(res: Response) {
        let body = res.json();
        let token = body.data['token'];
        console.log('auth service: ' + token);

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
        localStorage.removeItem('authenticatedUser');
    }

    public getToken() {
        if (JSON.parse(localStorage.getItem('authenticatedUser'))) {
            return JSON.parse(localStorage.getItem('authenticatedUser')).token;
        }

        return null;
    }

    private validateToken(): Observable<Response> {
        let headers = new Headers({
            'Authorization': 'Bearer '+ this.getToken(),
        });
        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.getUrl('signin'), options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
