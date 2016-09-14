/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ThreadService } from './thread.service';
import { EventsService } from './events.service';

@Component({
    templateUrl: 'app/templates/thread.component.html',
    providers: [ThreadService],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(10px)', opacity: 0}),
                group([
                    animate('0.3s 0.1s ease', style({
                        transform: 'translateY(0)',
                    })),
                    animate('0.3s ease', style({
                        opacity: 1
                    }))
                ])
            ]),
            transition('* => void', [
                style({transform: 'translateY(0px)', opacity: 1}),
                group([
                    animate('0s ease', style({
                        transform: 'translateX(10px)',
                    })),
                    animate('0s 0.2s ease', style({
                        opacity: 0
                    }))
                ])
            ])
        ])
    ]
})
export class ThreadComponent implements OnInit {
    private isLoading = true;
    private isFinish = false;
    private isShowComment = true;
    private thread: any;
    private errorMessage: string;
    mode = 'Observable';
    private id: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _threadService: ThreadService,
        private _eventsService: EventsService) {
        this._eventsService.isFinish.subscribe((mode : boolean) => {
            this.isFinish = mode;
        });
    }

    ngOnInit() {
        this.getId();
        this.getThread();
    }

    getId() {
        this._route.params.subscribe(
            params => {
                this.id = params['id'];
            });
    }

    getThread() {
        this._threadService.getThread(this.id)
            .subscribe(
                thread => {
                    this.thread = this.prettifyTime(thread);
                    this.isLoading = false;
                },
                error => this.errorMessage = <any>error
            );
    }

    goToThreads() {
        this._router.navigate(['threads']);
    }

    goToEditThread() {
        this._router.navigate(['threads/edit', this.id]);
    }

    deleteThread() {
        this._threadService.deleteThread(this.id)
            .subscribe(_ => {
                this._eventsService.isFinish.emit(true);
            });
    }

    private prettifyTime(thread) {
        var dtOld = Date.parse(thread['updated']);
        var dtNow = Date.now();

        var diffMs = (dtNow - dtOld); // milliseconds between now & Christmas
        var diffDays = Math.round(diffMs / 86400000); // days
        var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

        if (diffDays > 0) {
            thread['updated'] = diffDays + ' days ago';
        }
        else if (diffHrs > 0) {
            thread['updated'] = diffHrs + ' hours ago';
        }
        else {
            thread['updated'] = diffMins + ' mins ago';
        }

        return thread;
    }

    changeShowComment() {
        this.isShowComment = !this.isShowComment;
    }
}
