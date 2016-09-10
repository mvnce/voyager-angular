/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, OnDestroy, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { ThreadService } from './thread.service';
import { Thread } from './thread';

@Component({
    templateUrl: 'app/templates/threaddetail.component.html',
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
export class ThreadDetailComponent implements OnInit {
    threads: Thread[];
    thread = new Thread('', '', 1);
    errorMessage: string;
    loading = true;
    private sub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _threadService: ThreadService) {
    }

    ngOnInit() {
        this._route.params.subscribe(
            params => {
            let id = +params['id'];
            this._threadService.getThread(id).subscribe(
                threads => {
                    this.threads = threads;
                    this.loading = false;
                    console.log(this.threads);
                },
                error => this.errorMessage = <any>error,
            );
        });
    }

    // ngOnDestroy() {
    //     this.sub.unsubscribe();
    // }

    // ngOnInit() {
    //     this.sub = this._route.params.subscribe(params => {
    //         let id = +params['id']; // (+) converts string 'id' to a number
    //         this._threadService.getThread(id).subscribe(
    //             threads => {
    //                 this.threads = threads;
    //                 this.loading = false;
    //                 this.thread = this.threads[0];
    //             },
    //             error => this.errorMessage = <any>error,);
    //     });
    // }

    goToThreads() {
        this._router.navigate(['/threads']);
    }
}
