/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router } from "@angular/router";

import { ThreadService } from '../services/thread.service';
import { Thread } from '../models/thread';
import { EventsService } from '../services/events.service';

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
    title = "New Thread";
    public isFinish = false;

    thread = new Thread('', '');

    constructor(private _router: Router,
                private _threadService:ThreadService,
                private _eventsService: EventsService) {
        this._eventsService.isFinish.subscribe((mode : boolean) => {
            this.isFinish = mode;
        });
    }

    ngOnInit() { }

    addThread() {
        this._threadService.addThread(this.thread)
            .subscribe(_ => {
                this._eventsService.isFinish.emit(true);
            }
        );
    }

    goToForum() {
        this._router.navigate(['threads']);
    }

    addOrUpdate() {
        this.addThread();
    }
}
