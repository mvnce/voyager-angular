/**
 * Created by vincentma on 8/15/16.
 */

import {Component, trigger, state, style, animate, transition, group} from "@angular/core";
import {Router} from "@angular/router";


@Component({
    selector: "navbar",
    templateUrl: "app/templates/navbar.component.html",
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(-50px)', opacity: 0}),
                group([
                    animate('1.0s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('1.0s ease', style({
                        opacity: 1
                    }))
                ])
            ]),
        ])
    ]
})
export class NavBarComponent {
    constructor(private _router: Router) { }

    // isCurrentRoute(route) {
    //     var inst = this._router..generate(route);
    //     return this._router.isRouteActive(inst);
    // }
}