/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ThreadService } from './thread.service';
import { EventsService } from './events.service';
import { CommentService } from './comment.service';

@Component({
    templateUrl: 'app/templates/threaddetail.component.html',
    providers: [ThreadService],
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
export class ThreadDetailComponent implements OnInit {
    isLoading = true;
    public isFinish = false;
    thread: any;
    errorMessage: string;
    mode = 'Observable';
    id: number;

    isShowComment = true;



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
