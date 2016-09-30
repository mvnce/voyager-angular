/**
 * Created by vincentma on 9/9/16.
 */

import { Component, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from "./post.service";

@Component({
    templateUrl: 'app/post/posts.component.html',
    providers: [PostService],
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
export class PostsComponent implements OnInit {
    loading = true;
    posts: any[];
    errorMessage: string;
    mode = 'Observable';

    constructor(private _router: Router,
                private _postService: PostService) {}

    ngOnInit() {
        this.getPosts();
    }

    private prettifyTime(threads) {
        for (var thread of threads) {
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

        return threads;
    }

    private getPosts() {
        this._postService.getPosts()
            .subscribe(
                threads => {
                    this.posts = this.prettifyTime(threads);
                    this.loading = false;
                },
                error => this.errorMessage = <any>error
            );
    }

    onSelect(post) {
        this._router.navigate(['post', post["id"]]);
    }

    isLoading() {
        return this.loading;
    }
}
