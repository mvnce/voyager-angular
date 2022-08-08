/**
 * Created by Vincent Ma on 9/9/16.
 */

import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Router } from '@angular/router';
import { Story } from '../models/Story';
import {StoriesService} from "../services/stories.service";

@Component({
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss'],
  providers: [],
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
export class StoryFormComponent implements OnInit {
  title: string = 'New Story';
  story: Story;

  constructor(private _router: Router, private _storiesService: StoriesService) {
    this.story = new Story('', '');
  }

  ngOnInit(): void {
  }

  submit(): void {
    this._storiesService.createPost(this.story);
    console.log('submitted.');
  }
}
