/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router } from "@angular/router";
import { PostService } from './post.service';
import { Post } from '../models/post';

@Component({
    templateUrl: 'app/post/post-form.component.html',
    providers: [PostService],
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
export class PostFormComponent implements OnInit {
    private title = "New Post";

    private post: Post;

    constructor(private _router: Router,
                private _threadService: PostService) {
        this.post= new Post('', '');
    }

    ngOnInit() {}

    addOrUpdate() {
        this._threadService.addPost(this.post).subscribe();
        this._router.navigate(['/hold']);
    }
}
