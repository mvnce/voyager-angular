/**
 * Created by vincentma on 9/12/16.
 */

import {Component, OnInit trigger, state, style, transition, animate, group, Output, EventEmitter} from '@angular/core';
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
    // private isShowing = true;
    private comments: any[];
    isShowComment;
    @Output isShowing: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private _commentService: CommentService) {}

    ngOnInit() {
        this.getComments();

    }

    getComments() {
        this._commentService.getComments(19).subscribe(
            comments => {
                this.comments = comments;
                this.isLoading = false;
                console.log(comments);
            }
        )
    }

    changeShowStatus() {
        this.isShowing.emit(false);
    }


}