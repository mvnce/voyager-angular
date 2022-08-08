/**
 * Created by Vincent Ma on 9/18/16.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor (private _router: Router) {
  }

  canActivate (): boolean {
    return true;
    // else {
    // 	this._router.navigate(['account/signin']);
    // 	return false;
    // }
  }
}
