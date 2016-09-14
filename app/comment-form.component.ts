/**
 * Created by Vincent on 9/13/2016.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';

@Component({
    selector: 'comment-form',
    templateUrl: 'app/templates/comment-form.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(-20px)', opacity: 0}),
                group([
                    animate('0.5s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('0.5s ease', style({
                        opacity: 1
                    }))
                ])
            ])
        ])
    ]
})
export class CommentFormComponent implements OnInit {

    constructor() {}

    ngOnInit() {}


}