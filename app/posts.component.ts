/**
 * Created by vincentma on 8/16/16.
 */

import {Component, Input, OnInit, ViewContainerRef} from "@angular/core";
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import {PostService} from "./post.service";
import {UserService} from "./user.service";
import {LoadingComponent} from "./loading.component";


@Component({
    templateUrl: "app/templates/posts.component.html",
    providers: [PostService, UserService],
    directives: [LoadingComponent],
})
export class PostsComponent implements OnInit {
    isLoading = true;
    posts: any[];
    // @Input() totalLikes = 0;
    @Input() iLike = false;

    constructor(private _postService: PostService,
                private _userService: UserService,
                private _overlay: Overlay,
                private _vcRef: ViewContainerRef,
                public _modal: Modal) {
        _overlay.defaultViewContainer = _vcRef;
    }

    ngOnInit() {
        this._postService.getPosts().subscribe(posts => {
            this.isLoading = false;
            this.posts = this.prettifyTime(this.addUserInfo(posts));
        });
    }

    addUserInfo(posts) {
        this._userService.getUsers().subscribe(users => {

            for(var post of posts) {
                for(var user of users) {
                    if (user["id"] == post['user']) {
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
            var dtOld = Date.parse(post["created"]);
            var dtNow = Date.now();

            var diffMs = (dtNow - dtOld); // milliseconds between now & Christmas
            var diffDays = Math.round(diffMs / 86400000); // days
            var diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

            if (diffDays > 0) {
                post["elapsed"] = diffDays + " days ago";
            }
            else if (diffHrs > 0) {
                post["elapsed"] = diffHrs + " hours " + diffMins + " mins ago"
            }
            else {
                post["elapsed"] = diffMins + " mins ago";
            }
        }

        return posts;
    }

    likeClick() {
        this.iLike = !this.iLike;
    }

    onClick() {
        this._modal.alert()
            .size('lg')
            .showClose(true)
            .title('modal window')
            .body('<h4>this is a modal</h4>')
            .open();
    }
}