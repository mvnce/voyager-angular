/**
 * Created by vincentma on 9/12/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';

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
    private postId: number;

    constructor(private _route: ActivatedRoute, private _commentService: CommentService) {}

    ngOnInit() {
        this.getPostId();
        this.getComments();
    }

    getPostId() {
        this._route.params.subscribe(
            params => {
                this.postId = +params['id'];
            });
    }

    getComments() {
        this._commentService.getComments(this.postId).subscribe(
            comments => {
                this.comments = comments;
                this.isLoading = false;
            }
        )
    }
}