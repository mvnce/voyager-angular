/**
 * Created by vincentma on 8/31/16.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { AuthenticationService } from '../services/authentication.service';
import { SignInForm } from '../models/forms';

@Component({
    templateUrl: 'app/templates/signin.component.html',
    providers: [AuthenticationService],
})
export class SignInComponent implements OnInit{
    private form: SignInForm;
    private msgFlag: boolean;

    constructor(private _router: Router,
                private _authenticationService: AuthenticationService,
                private _eventsService: EventsService) {
        this.form = new SignInForm('' ,'');
        this.msgFlag = false;
        _authenticationService.login();
    }

    ngOnInit() {
        if (localStorage.getItem('authenticatedUser')) {
            this._router.navigate(['forum']);
        }
    }

    checkForm() {
        return (this.form.email == '' || this.form.password == '');
    }

    signIn() {
        this._authenticationService.signIn(this.form)
            .subscribe( flag => {
                if (flag) {
                    this.msgFlag = false;
                    this._eventsService.isLogin.emit(true);
                    this._router.navigate(['hold']);
                }
                else {
                    this.msgFlag = true;
                }
            });
    }
}
