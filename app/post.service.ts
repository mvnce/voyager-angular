/**
 * Created by vincentma on 8/16/16.
 */

import {Injectable} from "angular2/src/core/di/decorators";
import {Http} from "angular2/http";
import 'rxjs/add/operator/map';


@Injectable()
export class PostService {
    private _url = "http://127.0.0.1:8000/api/posts/";
    // private  _url = "https://jsonplaceholder.typicode.com/users";

    constructor(private _http: Http) { }

    getPosts() {
        return this._http.get(this._url).map(res => res.json());
    }

}