/**
 * Created by Vincent on 9/29/16.
 */

import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  constructor(private __authenticationService: AuthenticationService) {}
}
