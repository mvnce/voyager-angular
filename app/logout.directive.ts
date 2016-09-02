/**
 * Created by vincentma on 9/1/16.
 */

/**
 * Created by vincentma on 8/31/16.
 */

import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from './user.service';

import {EventsService} from './events.service';


@Component({
    selector: 'logout',
    template: `<div (click)="logout()">Logout</div>`,
})
export class LogoutDirective {

    constructor(private _router: Router,
                private _userService: UserService,
                private _eventsService: EventsService) { }

    logout() {
        console.log('logout clicked!');

        this._userService.logout();
        this._eventsService.isLogin.emit(false);
        this._router.navigate(['account/login']);
    }
}
