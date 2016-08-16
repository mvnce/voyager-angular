import {Component} from "angular2/core";
import {NavBarComponent} from "./navbar.component";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";

import {HomeComponent} from "./home.component";
import {PostsComponent} from "./posts.component";


@RouteConfig([
    {
        path: '/',
        name: 'Home',
        component: HomeComponent,
    },
    {
        path: '/posts',
        name: 'Posts',
        component: PostsComponent,
    },
    {
        path: '/*other',
        name: 'Other',
        redirectTo: ['Home'],
    }
])


@Component({
    selector: "my-app",
    templateUrl: "app/templates/app.component.html",
    directives: [NavBarComponent, ROUTER_DIRECTIVES],
})
export class AppComponent { }