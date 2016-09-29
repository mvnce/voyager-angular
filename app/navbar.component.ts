/**
 * Created by vincentma on 8/15/16.
 */

import {Component, OnInit, trigger, state, style, animate, transition, group} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';

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

    constructor(private _router: Router,
                private _authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        var token = localStorage.getItem('id_token');
        console.log('id_token' ,token);
    }
}
