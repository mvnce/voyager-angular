/**
 * Created by vincentma on 8/24/16.
 */

import {NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent}  from './app.component';
import { routing, routedComponents } from './app.routing';
import {PostService} from "./post.service";
import {UserService} from "./user.service";
import {HomeComponent} from "./home.component";
import {PostsComponent} from "./posts.component";
import {UsersComponent} from "./users.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        routedComponents,
    ],
    providers: [
        PostService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }