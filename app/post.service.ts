/**
 * Created by vincentma on 8/16/16.
 */

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()
export class PostService {
    private _url = "http://104.131.139.229:8000/api/posts/";

    private getPostUrl(postId) {
        return this._url + postId +"/";
    }

    constructor(private _http: Http) { }

    getPosts() {
        return this._http.get(this._url).map(res => res.json());
    }

    getPost(postId) {
        return this._http.get(this.getPostUrl(postId)).map(res => res.json());
    }
}
