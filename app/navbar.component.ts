/**
 * Created by vincentma on 8/15/16.
 */

import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES} from "@angular/router-deprecated";


@Component({
    selector: "navbar",
    templateUrl: "app/templates/navbar.component.html",
    directives: [ROUTER_DIRECTIVES],
})
export class NavBarComponent {
    constructor(private _router: Router) { }

    isCurrentRoute(route) {
        var inst = this._router.generate(route);
        return this._router.isRouteActive(inst);
    }
}