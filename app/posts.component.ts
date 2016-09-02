/**
 * Created by vincentma on 8/16/16.
 */

import { Component, Input, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { PostService } from './post.service';
import { UserService } from './user.service';


@Component({
    templateUrl: 'app/templates/posts.component.html',
    providers: [PostService, UserService],
    // directives: [LoadingComponent],
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
export class PostsComponent implements OnInit {
    loading = true;
    posts: any[];
    state = 'inactive';
    @Input() iLike = false;

    constructor(private _postService: PostService,
                private _userService: UserService) {
    }

    ngOnInit() {
        this._postService.getPosts().subscribe(posts => {
            this.posts = this.prettifyTime(this.addUserInfo(posts));
            this.loading = false;
        });
    }

    addUserInfo(posts) {
        this._userService.getUsers().subscribe(users => {

            for(var post of posts) {
                for(var user of users) {
                    if (user['id'] == post['user']) {
                        post['username'] = user['username'];
                        post['first_name'] = user['first_name'];
                        post['last_name'] = user['last_name'];
                    }
                }
            }
        });

        return posts;
    }

    prettifyTime(posts) {
        for (var post of posts) {
            var dtOld = Date.parse(post['created']);
            var dtNow = Date.now();

            var diffMs = (dtNow - dtOld); // milliseconds between now & Christmas
            var diffDays = Math.round(diffMs / 86400000); // days
            var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

            if (diffDays > 0) {
                post['elapsed'] = diffDays + ' days ago';
            }
            else if (diffHrs > 0) {
                post['elapsed'] = diffHrs + ' hours ' + diffMins + ' mins ago';
            }
            else {
                post['elapsed'] = diffMins + ' mins ago';
            }
        }

        return posts;
    }

    likeClick() {
        this.iLike = !this.iLike;
    }

    openPostModal(event) { }

    isLoading() {
        return this.loading;
    }
}
