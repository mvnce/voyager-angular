/**
 * Created by vincentma on 9/18/16.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private _router: Router) {}

    canActivate() {

        if (tokenNotExpired()) {
            return true;
        }
        else {
            this._router.navigate(['account/signin']);
            return false;
        }
    }
}