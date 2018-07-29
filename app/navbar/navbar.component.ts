/**
 * Created by Vincent Ma on 8/15/16.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: 'app/navbar/navbar.component.html',
  providers: [AuthenticationService]
})
export class NavBarComponent implements OnInit {

  constructor (private _router: Router, private _authenticationService: AuthenticationService) {
  }

  ngOnInit (): void {
    let token = localStorage.getItem('id_token');
    console.log('id_token', token);
  }
}
