/**
 * Created by vincentma on 9/10/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

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
export class EditThreadComponent implements OnInit {
    title = "Edit Thread";
    loading = true;
    public isFinish = false;
    errorMessage: string;
    thread = new Thread('', '');
    mode = 'Observable';
    id: number;

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _threadService:ThreadService) {
        console.log('edit thread constructor');
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
                    this.thread.title = thread['title'];
                    this.thread.content = thread['content'];
                    this.loading = false;
                },
                error => this.errorMessage = <any>error
            );
    }

    addOrUpdate() {
        this._threadService.updateThread(this.id, this.thread).subscribe();
        this._router.navigate(['/hold']);
    }
}
