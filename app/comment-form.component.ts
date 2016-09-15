/**
 * Created by Vincent on 9/13/2016.
 */

import {Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from './comment';
import { CommentService } from './comment.service';

@Component({
    selector: 'comment-form',
    templateUrl: 'app/templates/comment-form.component.html',
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
export class CommentFormComponent implements OnInit {
    private comment = new Comment(0 ,0 , '', '');
    private postId: number;

    constructor(private _route: ActivatedRoute, private _commentService: CommentService) {}

    ngOnInit() {
        this.getPostId();
    }

    getPostId() {
        this._route.params.subscribe(
            params => {
                this.postId = +params['id'];
            });
    }

    addComment() {
        this.comment.post_id = this.postId;
        this._commentService.addComment(this.comment).subscribe();
        this.comment = new Comment(0, 0, '', '');
    }
}
