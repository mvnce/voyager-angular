/**
 * Created by vincentma on 9/18/16.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private _router: Router) {}

    canActivate() {
        let authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));

        if (authenticatedUser) {
            return true;
        }
        else {
            this._router.navigate(['account/signin']);
        }
    }
}