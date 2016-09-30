/**
 * Created by vincentma on 8/16/16.
 */

import { Component, Input, OnInit, trigger, state, style, transition, animate, group } from '@angular/core';
import { PhotoPostService } from './photo-post.service';
import { UserService } from '../authentication/user.service';

@Component({
    templateUrl: 'app/photo-post/photo-posts.component.html',
    providers: [PhotoPostService, UserService],
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
export class PhotoPostsComponent implements OnInit {
    loading = true;
    posts: any[];
    state = 'inactive';
    @Input() iLike = false;

    constructor(private _photoPostService: PhotoPostService) {
    }

    ngOnInit() {
        this._photoPostService.getPhotoPosts().subscribe(posts => {
            this.posts = this.prettifyTime(posts);
            this.loading = false;
        });
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

    isLoading() {
        return this.loading;
    }
}
