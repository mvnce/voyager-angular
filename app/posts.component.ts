/**
 * Created by vincentma on 8/16/16.
 */

import {Component} from "angular2/src/core/metadata";
import {PostService} from "./post.service";


@Component({
    templateUrl: "app/templates/posts.component.html",
    providers: [PostService],
})
export class PostsComponent {
    isLoading = true;
    posts: any[];

    constructor(private _service: PostService) { }

    ngOnInit() {
        this._service.getPosts().subscribe(posts => this.posts = posts);
        this.isLoading = false;
    }

}