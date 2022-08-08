/**
 * Created by Vincent Ma on 8/16/16.
 */

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PhotoPostService {
  private _url = 'http://104.131.139.229:8000/api/posts/';

  constructor(private _httpClient: HttpClient) { }

  getPhotoPosts(): any {
    return this._httpClient.get(this._url).pipe(
      map((res: any) => {
        res.json();
      })
    );
  }

  getPhotoPost(postId: string): any {
    return this._httpClient.get(this.getPostUrl(postId)).pipe(
      map((res: any) => {
        res.json();
      })
    );
  }

  private getPostUrl(postId: string): any {
    return this._url + postId + '/';
  }
}
