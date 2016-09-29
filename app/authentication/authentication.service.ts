/**
 * Created by Vincent on 9/17/2016.
 */

import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { tokenNotExpired } from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthenticationService {
    lock = new Auth0Lock('YGRy3khHAVSDkK5B9DR2PcnN4RdxCkb7', 'vinceeema.auth0.com', {});

    constructor(private _http: Http) {
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

    public getToken() {
        return localStorage.getItem('id_token') ? localStorage.getItem('id_token') : "";
    }
}
