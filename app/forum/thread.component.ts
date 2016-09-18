/**
 * Created by vincentma on 9/9/16.
 */

import {Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ThreadService } from '../services/thread.service';

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
            ])
        ])
    ]
})
export class ThreadComponent implements OnInit {
    private isLoading = true;
    private isShowComment = true;
    private thread: any;
    private errorMessage: string;
    private id: number;
    mode = 'Observable';

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _threadService: ThreadService) {}

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
                    this.thread = thread;
                    this.isLoading = false;
                },
                error => this.errorMessage = <any>error
            );
    }

    goToThreads() {
        this._router.navigate(['/forum']);
    }

    editThread() {
        this._router.navigate(['/thread/edit', this.id]);
    }

    deleteThread() {
        this._threadService.deleteThread(this.id).subscribe();
        this._router.navigate(['/hold']);
    }

    changeShowComment() {
        this.isShowComment = !this.isShowComment;
    }
}
