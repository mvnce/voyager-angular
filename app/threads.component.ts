/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router } from '@angular/router';

import { ThreadService } from "./thread.service";

@Component({
    templateUrl: 'app/templates/threads.component.html',
    providers: [ThreadService],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(20px)', opacity: 0}),
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
export class ThreadsComponent implements OnInit {
    loading = true;
    threads: any[];
    errorMessage: string;
    mode = 'Observable';

    constructor(private _router: Router,
                private _threadService: ThreadService) {}

    ngOnInit() {
        this.getThreads();
    }

    private prettifyTime(threads) {
        for (var thread of threads) {
            var dtOld = Date.parse(thread['Updated']);
            var dtNow = Date.now();

            var diffMs = (dtNow - dtOld); // milliseconds between now & Christmas
            var diffDays = Math.round(diffMs / 86400000); // days
            var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

            if (diffDays > 0) {
                thread['Updated'] = diffDays + ' days ago';
            }
            else if (diffHrs > 0) {
                thread['Updated'] = diffHrs + ' hours ago';
            }
            else {
                thread['Updated'] = diffMins + ' mins ago';
            }
        }

        return threads;
    }

    getThreads() {
        this._threadService.getThreads()
            .subscribe(
                threads => {
                    this.threads = this.prettifyTime(threads);
                    this.loading = false;
                },
                error => this.errorMessage = <any>error
            );
    }

    onSelect(thread) {
        this._router.navigate(['thread', thread["Id"]]);
    }

    isLoading() {
        return this.loading;
    }
}
