import {Component} from "@angular/core";
import {NavBarComponent} from "./navbar.component";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";

import {HomeComponent} from "./home.component";
import {PostsComponent} from "./posts.component";
import {UsersComponent} from "./users.component";


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
        path: '/users',
        name: 'Users',
        component: UsersComponent,
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