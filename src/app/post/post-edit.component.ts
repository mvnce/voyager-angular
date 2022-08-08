/**
 * Created by Vincent Ma on 9/10/16.
 */

import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';

import { StoriesService } from '../services/stories.service';
import { Story } from '../models/Story';

@Component({
  templateUrl: '../stories/story-form.component.html',
  providers: [StoriesService],
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateY(-10px)', opacity: 0 }),
        group([
          animate('0.5s 0.1s ease', style({
            transform: 'translateY(0)'
          })),
          animate('0.5s ease', style({
            opacity: 1
          }))
        ])
      ])
    ])
  ]
})
export class EditPostComponent {
  title = 'Edit Thread';
  loading = true;
  public isFinish = false;
  errorMessage: string = '';
  thread = new Story('', '');
  mode = 'Observable';
  id: number = 1;

  constructor(private _route: ActivatedRoute, private _router: Router, private _threadService: StoriesService) {
    console.log('edit thread constructor');
  }

  ngOnInit(): void {
    this.getId();
    this.getThread();
  }

  getId(): void {
    this._route.params.subscribe(
      params => {
        this.id = params.id;
      });
  }

  getThread(): void {
    this._threadService.getPost(this.id)
      .subscribe(
        thread => {
          this.thread.title = thread.title;
          this.thread.content = thread.content;
          this.loading = false;
        },
        error => this.errorMessage = <any>error
      );
  }

  addOrUpdate(): void {
    this._threadService.updatePost(this.id, this.thread).subscribe();
    this._router.navigate(['/hold']);
  }
}
