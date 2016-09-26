/**
 * Created by vincentma on 8/15/16.
 */

import {Component, OnInit, trigger, state, style, animate, transition, group} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { EventsService } from './services/events.service';

@Component({
    selector: "navbar",
    templateUrl: "app/templates/navbar.component.html",
    providers: [AuthenticationService],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(-50px)', opacity: 0}),
                group([
                    animate('0.5s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('0.5s ease', style({
                        opacity: 1
                    }))
                ])
            ]),
        ])
    ],
})
export class NavBarComponent implements OnInit {
    public isLogin: boolean;
    private username: string;

    constructor(private _router: Router,
                private _authenticationService: AuthenticationService,
                private _eventsService: EventsService) {
        this._eventsService.isLogin.subscribe((status : boolean) =>{
            this.isLogin = status;
        });
        this._eventsService.username.subscribe((name : string) =>{
            this.username = name;
        });
    }

    ngOnInit() {
        var user = localStorage.getItem('authenticatedUser');
        console.log('authenticatedUser' ,user);

        if (user) {
            this.isLogin = true;
        }
    }

    logOut() {
        this._authenticationService.signOut();
        this._eventsService.isLogin.emit(false);
        this._router.navigate(['account/signin']);
    }
}
