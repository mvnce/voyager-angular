/**
 * Created by vincentma on 8/31/16.
 */

import {Component, OnInit, trigger, state, style, animate, transition, group} from '@angular/core';
import {Validators, FormBuilder} from "@angular/common";
import {Router} from "@angular/router";

import {UserService} from './user.service';
import {EventsService} from './events.service';

import {User} from './user';


@Component({
    templateUrl: 'app/templates/login.component.html',
    providers: [FormBuilder],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(50px)', opacity: 0}),
                group([
                    animate('1.0s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('1.0s ease', style({
                        opacity: 1
                    }))
                ])
            ]),
            transition('* => void', [
                group([
                    animate('1.0s ease', style({
                        transform: 'translateY(50px)',
                    })),
                    animate('1.0s 0.2s ease', style({
                        opacity: 0
                    }))
                ])
            ])
        ])
    ]
})
export class LoginComponent {
    loginForm;
    active = true;
    msgFlag = false;
    user: User;

    constructor(_fb: FormBuilder,
                private _router: Router,
                private _userService: UserService,
                private _eventsService: EventsService) {
        this.loginForm = _fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });


    }

    ngOnInit() {
        if (localStorage.getItem('user')) {
            this._router.navigate(['posts']);
        }
    }

    login(event) {
        console.log('login clicked!');

        this.user = new User('admin@mail.com', 'admin');

        if (this._userService.login(this.user)) {
            this.active = false;
            this._eventsService.isLogin.emit(true);
            this._router.navigate(['posts']);
            console.log('login successful');
        }
        else {
            this.msgFlag = true;
            console.log('login failed');
        }
    }
}
