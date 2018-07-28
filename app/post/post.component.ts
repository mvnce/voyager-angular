/**
 * Created by Vincent Ma on 9/9/16.
 */

import { Component, HostBinding, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { PostService } from './post.service';

@Component({
  templateUrl: 'app/post/post.component.html',
  providers: [PostService],
  host: {
    '[@routeAnimation]': 'true'
  },
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
export class PostComponent implements OnInit {
  private isLoading = true;
  private isShowComment = true;
  private post: any;
  private errorMessage: string;
  private id: number;
  mode = 'Observable';

  constructor (
    private _route: ActivatedRoute,
    private _router: Router,
    private _postService: PostService) {
  }

  ngOnInit (): void {
    this.getId();
    this.getPost();
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

  getId (): void {
    this._route.params.subscribe(
      params => {
        this.id = params.id;
      });
  }

  getPost (): void {
    this._postService.getPost(this.id)
      .subscribe(
        post => {
          this.post = post;
          this.isLoading = false;
        },
        error => this.errorMessage = <any>error
      );
  }

  goToPosts (): void {
    this._router.navigate(['/posts']);
  }

  editPost (): void {
    this._router.navigate(['/post/edit', this.id]);
  }

  deletePost (): void {
    this._postService.deletePost(this.id).subscribe();
    this._router.navigate(['/hold']);
  }

  changeShowComment (): void {
    this.isShowComment = !this.isShowComment;
  }
}
