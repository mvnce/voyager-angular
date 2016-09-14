/**
 * Created by vincentma on 8/31/16.
 */

import { Component, OnInit, trigger, state, style, animate, transition, group } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { EventsService } from './events.service';

@Component({
    templateUrl: 'app/templates/signin.component.html',
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
export class SignInComponent implements OnInit{
    loginForm;
    active = true;
    msgFlag = false;

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
    }
}
