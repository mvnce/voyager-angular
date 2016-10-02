/**
 * Created by vincentma on 8/16/16.
 */

import { Component, HostBinding, trigger, state, style, transition, animate, group } from '@angular/core'


@Component({
    templateUrl: 'app/home/home.component.html',
    host: {
        '[@routeAnimation]': 'true'
    },
    animations: [
        trigger('routeAnimation', [
            state('*', style({transform: 'translateX(0)', opacity: 1})),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateY(5%)'
                }),
                animate('0.5s 0.1s ease-in')
            ]),
            transition('* => void', [
                animate('0.5s ease-out', style({
                    opacity: 0,
                    transform: 'translateY(5%)'
                }))
            ])
        ])
    ]
})
export class HomeComponent {
    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }
    @HostBinding('style.display') get display() {
        return 'block';
    }
    @HostBinding('style.position') get position() {
        return 'absolute';
    }
}