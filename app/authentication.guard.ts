/**
 * Created by vincentma on 9/18/16.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private _router: Router) {}

    canActivate() {
        if (localStorage.getItem('authenticatedUser')) {
            return true;
        }

        this._router.navigate(['/account/signin']);
        return false;
    }
}