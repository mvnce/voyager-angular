/**
 * Created by vincentma on 8/17/16.
 */

import {Component, OnInit, trigger, state, style, animate, transition, group} from '@angular/core';
import {UserService} from './user.service';


@Component({
    templateUrl: 'app/templates/users.component.html',
    providers: [UserService],
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
export class UsersComponent implements OnInit {
    loading = true;
    users: any[];

    constructor(private _service: UserService) { }

    ngOnInit() {
        // this._service.getUsers().subscribe(users => {
        //     this.users = users;
        //     this.loading = false;
        // });
    }

    isLoading() {
        return this.loading;
    }
}
