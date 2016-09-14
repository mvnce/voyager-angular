/**
 * Created by vincentma on 9/12/16.
 */

import {Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import {CommentService} from "./comment.service";

@Component({
    selector: 'comment',
    templateUrl: 'app/templates/comment.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateY(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateY(20px)', opacity: 0}),
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
export class CommentComponent implements OnInit{
    private isLoading = true;
    private comments: any[];

    constructor(private _commentService: CommentService) {}

    ngOnInit() {
        this.getComments();
    }

    getComments() {
        this._commentService.getComments(19).subscribe(
            comments => {
                this.comments = this.prettifyTime(comments);
                this.isLoading = false;
                console.log(comments);
            }
        )
    }

    private prettifyTime(comments) {
        for (var thread of comments) {
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
        }

        return comments;
    }
}