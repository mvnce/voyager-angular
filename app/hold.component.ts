/**
 * Created by Vincent on 9/17/16.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'app/templates/hold.component.html',
})
export class HoldComponent implements OnInit {
    constructor(private _router: Router) {}

    ngOnInit() {
    }

    goToForum() {
        this._router.navigate(['forum']);
    }
}
