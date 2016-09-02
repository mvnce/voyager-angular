/**
 * Created by vincentma on 8/17/16.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {User} from './user';

var users = [
    new User('admin@mail.com','admin'),
    new User('user@mail.com','user')
];

@Injectable()
export class UserService {
    private _url = "http://104.131.139.229:8000/api/accounts/users/";

    constructor(private _http: Http) { }

    getUsers() {
        return this._http.get(this._url).map(res => res.json());
    }

    login(user) {
        var authUser = users.find(u => u.email === user.email);

        if (authUser && authUser.password === user.password) {
            localStorage.setItem('user', authUser.toString());
            return true;
        }

        return false;
    }

    logout() {
        localStorage.removeItem('user');
        return true;
    }
}
