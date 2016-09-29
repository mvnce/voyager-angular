/**
 * Created by Vincent on 9/28/16.
 */

import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'login',
    templateUrl: 'app/templates/sign-in.component.html',
})

export class SignInComponent {
    constructor(private __authenticationService: AuthenticationService) {}
}
