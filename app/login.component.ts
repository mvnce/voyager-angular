/**
 * Created by vincentma on 8/31/16.
 */

import {Component, trigger, state, style, animate, transition, group} from '@angular/core';
import {Validators, FormBuilder} from "@angular/common";


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
        ])
    ]
})
export class LoginComponent {
    loginForm;
    submitted = false;

    constructor(_fb: FormBuilder) {
        this.loginForm = _fb.group({
            username: ['username', Validators.required],
            password: ['password', Validators.required],
        });
    }

    login(event) {
        console.log('login clicked!');
    }
}
