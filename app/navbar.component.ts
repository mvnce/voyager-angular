/**
 * Created by vincentma on 8/15/16.
 */

import {Component, OnInit, trigger, state, style, animate, transition, group} from '@angular/core';
import {Router} from '@angular/router';

import { UserService } from './user.service';
import { EventsService } from './events.service';

@Component({
    selector: "navbar",
    templateUrl: "app/templates/navbar.component.html",
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(-50px)', opacity: 0}),
                group([
                    animate('1.0s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('1.0s ease', style({
                        opacity: 1
                    }))
                ])
            ]),
        ])
    ],
})
export class NavBarComponent implements OnInit {
    public isLogin =  false;

    constructor(private _router: Router,
                private _userService: UserService,
                private _eventsService: EventsService) {
        this._eventsService.isLogin.subscribe((mode : boolean) =>{
            this.isLogin = mode;
        });
    }

    ngOnInit() {
        var user = localStorage.getItem('user');
        console.log('authUser' ,user);

        if (user) {
            this.isLogin = true;
        }
    }

    logout() {
        // this._userService.logout();
        this._eventsService.isLogin.emit(false);
        this._router.navigate(['account/login']);
    }
}
