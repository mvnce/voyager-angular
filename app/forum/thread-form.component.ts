/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router } from "@angular/router";
import { ThreadService } from './thread.service';
import { Thread } from '../models/thread';

@Component({
    templateUrl: 'app/templates/thread-form.component.html',
    providers: [ThreadService],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(-10px)', opacity: 0}),
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
export class ThreadFormComponent implements OnInit {
    private title = "New Thread";

    private thread: Thread;

    constructor(private _router: Router,
                private _threadService: ThreadService) {
        this.thread= new Thread('', '');
    }

    ngOnInit() {}

    addOrUpdate() {
        this._threadService.addThread(this.thread).subscribe();
        this._router.navigate(['/hold']);
    }
}
