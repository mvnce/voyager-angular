/**
 * Created by vincentma on 9/3/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'account',
    templateUrl: 'app/templates/account.component.html',
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
            ])
        ])
    ]
})
export class AccountComponent implements OnInit {

    constructor(private _userService: UserService) {

    }

    ngOnInit() {

    }
}