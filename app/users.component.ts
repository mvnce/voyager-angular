/**
 * Created by vincentma on 8/17/16.
 */

import {Component} from "angular2/core";
import {UserService} from "./user.service";


@Component({
    templateUrl: "app/templates/users.component.html",
    providers: [UserService]
})
export class UsersComponent {
    isLoading = true;
    users: any[];

    constructor(private _service: UserService) { }

    ngOnInit() {
        this._service.getUsers().subscribe(users => this.users = users);
        this.isLoading = false;
    }
}