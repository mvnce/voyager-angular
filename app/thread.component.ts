/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router } from "@angular/router";

import { ThreadService } from "./thread.service";
import { Thread } from "./thread";

@Component({
    templateUrl: 'app/templates/thread.component.html',
    providers: [ThreadService],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(50px)', opacity: 0}),
                group([
                    animate('1.0s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('1.0s ease', style({
                        opacity: 1
                    }))
                ])
            ])
        ])
    ]
})
export class ThreadComponent implements OnInit {
    thread = new Thread('', '');
    id = 1;

    constructor(private _router:Router, private _threadService: ThreadService) {}

    ngOnInit() {
        this._threadService.getThread(this.id)
            .subscribe(thread => this.thread);
    }
}
