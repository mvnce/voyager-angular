/**
 * Created by Vincent Ma on 8/16/16.
 */

import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { PhotoPostService } from './photo-post.service';
import { UserService } from '../../authentication/user.service';

@Component({
  templateUrl: 'app/photo-post/photo-posts.component.html',
  providers: [PhotoPostService, UserService],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        group([
          animate('1.0s 0.1s ease', style({
            transform: 'translateY(0)'
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

  ngOnInit(): void {
    this._photoPostService.getPhotoPosts().subscribe(posts => {
      this.posts = this.prettifyTime(posts);
      this.loading = false;
    });
  }

  prettifyTime(posts): any[] {
    for (let post of posts) {
      let dtOld = Date.parse(post.created);
      let dtNow = Date.now();

      let diffMs = (dtNow - dtOld); // milliseconds between now & Christmas
      let diffDays = Math.round(diffMs / 86400000); // days
      let diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
      let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

      if (diffDays > 0) {
        post.elapsed = diffDays + ' days ago';
      } else if (diffHrs > 0) {
        post.elapsed = diffHrs + ' hours ' + diffMins + ' mins ago';
      } else {
        post.elapsed = diffMins + ' mins ago';
      }
    }

    return posts;
  }

  likeClick(): void {
    this.iLike = !this.iLike;
  }

  isLoading(): boolean {
    return this.loading;
  }
}
