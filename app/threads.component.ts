/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { ThreadService } from "./thread.service";

@Component({
    templateUrl: 'app/templates/threads.component.html',
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
export class ThreadsComponent implements OnInit {
    loading = true;
    threads: any[];

    constructor(private _threadService: ThreadService) {}

    ngOnInit() {
        this._threadService.getThreads().subscribe(threads => {
            this.threads = this.prettifyTime(threads);
            console.log(threads);
            this.loading = false;
        });
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
                thread['Updated'] = diffHrs + ' hours ' + diffMins + ' mins ago';
            }
            else {
                thread['Updated'] = diffMins + ' mins ago';
            }
        }

        return threads;
    }

    isLoading() {
        return this.loading;
    }
}
