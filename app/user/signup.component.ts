/**
 * Created by vincentma on 9/11/16.
 */

import { Component, OnInit } from '@angular/core';
import { SignUpForm } from "../models/forms";
import {AuthenticationService} from "../services/authentication.service";

@Component({
    templateUrl: 'app/templates/signup.component.html',
    providers: [AuthenticationService],
})
export class SignUpComponent implements OnInit {
    private form: SignUpForm;
    private password2: string;

    constructor(private _authenticationService: AuthenticationService) {
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
    }
}
