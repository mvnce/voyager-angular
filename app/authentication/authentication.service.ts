/**
 * Created by Vincent on 9/17/2016.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { myConfig } from './authentication.config';


declare var Auth0: any;

@Injectable()
export class AuthenticationService {

    auth0 = new Auth0({
        domain: myConfig.domain,
        clientID: myConfig.clientID,
        callbackOnLocationHash: true,
        callbackURL: myConfig.callbackURL,
    });

    constructor(private _router: Router) {
        var result = this.auth0.parseHash(window.location.hash);

        if (result && result.idToken) {
            localStorage.setItem('id_token', result.idToken);
            this._router.navigate(['/forum']);
        } else if (result && result.error) {
            alert('error: ' + result.error);
        }
    }

    public signIn(username, password) {
        this.auth0.login({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, function(err) {
            if (err) alert("something went wrong: " + err.message);
        });
    };

    public signUp(username, password) {
        this.auth0.signup({
            connection: 'Username-Password-Authentication',
            responseType: 'token',
            email: username,
            password: password,
        }, function(err) {
            if (err) alert("something went wrong: " + err.message);
        });
    };

    public googleSignIn() {
        this.auth0.login({
            connection: 'google-oauth2'
        }, function(err) {
            if (err) alert("something went wrong: " + err.message);
        });
    };

    public authenticated() {
        return tokenNotExpired();
    };

    public signOut() {
        localStorage.removeItem('id_token');
    };

    public getToken() {
        return localStorage.getItem('id_token') ? localStorage.getItem('id_token') : "";
    }
}
