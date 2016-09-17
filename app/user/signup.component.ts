/**
 * Created by vincentma on 9/11/16.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { AuthenticationService } from '../services/authentication.service';
import { SignUpForm } from "../models/forms";

@Component({
    templateUrl: 'app/templates/signup.component.html',
    providers: [AuthenticationService],
})
export class SignUpComponent implements OnInit {
    private form: SignUpForm;
    private password2: string;

    constructor(private _router: Router,
                private _authenticationService: AuthenticationService,
                private _eventsService: EventsService) {
        this.form = new SignUpForm('', '', '');
        this.password2 = '';
    }

    ngOnInit() {
    }

    confirmPassword() {
        return  !(this.form.password != this.password2 &&
                this.password2 != '');
    }

    checkForm() {
        return (
            this.form.name == '' ||
            this.form.email == '' ||
            this.form.password == '' ||
            this.password2 == '');
    }

    signUp() {
        this._authenticationService.signUp(this.form).subscribe();
        this._eventsService.isLogin.emit(true);
        this._router.navigate(['hold']);
    }
}
