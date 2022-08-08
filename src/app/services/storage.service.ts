/**
 * Created by Vincent Ma on 8/8/22.
 */

import {Injectable} from '@angular/core';
import {Story} from '../models/Story';

@Injectable()
export class StoriesService {
  private _stories: Story[];

  get stories(): Story[] {
    return this._stories;
  }

  set stories(value: Story[]) {
    this._stories = value;
  }

  constructor() {
    this._stories = [
      new Story('First Story', 'first story content 1'),
      new Story('Second Story', 'second story content 2')
    ];
  }
}
