/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PostService } from './post.service';

@Component({
    templateUrl: 'app/post/post.component.html',
    providers: [PostService],
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
export class PostComponent implements OnInit {
    private isLoading = true;
    private isShowComment = true;
    private post: any;
    private errorMessage: string;
    private id: number;
    mode = 'Observable';

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _postService: PostService) {}

    ngOnInit() {
        this.getId();
        this.getPost();
    }

    getId() {
        this._route.params.subscribe(
            params => {
                this.id = params['id'];
            });
    }

    getPost() {
        this._postService.getPost(this.id)
            .subscribe(
                post => {
                    this.post = post;
                    this.isLoading = false;
                },
                error => this.errorMessage = <any>error
            );
    }

    goToPosts() {
        this._router.navigate(['/posts']);
    }

    editPost() {
        this._router.navigate(['/post/edit', this.id]);
    }

    deletePost() {
        this._postService.deletePost(this.id).subscribe();
        this._router.navigate(['/hold']);
    }

    changeShowComment() {
        this.isShowComment = !this.isShowComment;
    }
}
