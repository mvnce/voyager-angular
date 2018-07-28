/**
 * Created by Vincent Ma on 9/9/16.
 */

import { Component, HostBinding, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Router } from '@angular/router';

import { PostService } from './post.service';

@Component({
  templateUrl: 'app/post/posts.component.html',
  providers: [PostService],
  animations: [
    trigger('routeAnimation', [
      state('*', style({transform: 'translateX(0)', opacity: 1})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(5%)'
        }),
        animate('0.5s 0.1s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(5%)'
        }))
      ])
    ])
  ]
})
export class PostsComponent implements OnInit {
  private isLoading = true;
  private posts: any[];
  private errorMessage: string;
  mode = 'Observable';

  constructor (private _router: Router,
               private _postService: PostService) {
  }

  ngOnInit (): void {
    this.getPosts();
  }

  @HostBinding('@routeAnimation')
  get routeAnimation (): boolean {
    return true;
  }

  @HostBinding('style.display')
  get display (): string {
    return 'block';
  }

  @HostBinding('style.position')
  get position (): string {
    return 'absolute';
  }

  onSelect (post): void {
    this._router.navigate(['post', post.id]);
  }

  private prettifyTime (threads): any {
    for (let thread of threads) {
      let dtOld = Date.parse(thread.updated);
      let dtNow = Date.now();

      let diffMs = (dtNow - dtOld); // milliseconds between now & Christmas
      let diffDays = Math.round(diffMs / 86400000); // days
      let diffHrs = Math.round((diffMs % 86400000) / 3600000); // hours
      let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

      if (diffDays > 0) {
        thread.updated = diffDays + ' days ago';
      } else if (diffHrs > 0) {
        thread.updated = diffHrs + ' hours ago';
      } else {
        thread.updated = diffMins + ' minutes ago';
      }
    }

    return threads;
  }

  private getPosts (): void {
    this._postService.getPosts()
      .subscribe(
        threads => {
          this.posts = this.prettifyTime(threads);
          this.isLoading = false;
        },
        error => this.errorMessage = <any>error
      );
  }
}
