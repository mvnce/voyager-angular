/**
 * Created by vincentma on 8/17/16.
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

import {LoadingComponent} from './loading.component';


@Component({
    templateUrl: 'app/templates/users.component.html',
    providers: [UserService],
    directives: [LoadingComponent],
})
export class UsersComponent implements OnInit {
    loading = true;
    users: any[];

    constructor(private _service: UserService) { }

    ngOnInit() {
        this._service.getUsers().subscribe(users => {
            this.users = users;
            this.loading = false;
        });
    }

    isLoading() {
        return this.loading;
    }
}
