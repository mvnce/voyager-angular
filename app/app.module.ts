/**
 * Created by vincentma on 8/24/16.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavBarComponent } from './navbar.component';
import { FaComponent } from 'angular2-fontawesome/components';
import { LoadingComponent } from './loading.component';
import { CommentComponent } from './forum/comment.component';
import { CommentFormComponent } from './forum/comment-form.component';
import { routing, routedComponents } from './app.routing';

import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { EventsService } from './services/events.service';
import { ThreadService } from './services/thread.service';
import { CommentService } from './services/comment.service';
import { AuthenticationService } from './services/authentication.service';

import { AuthenticationGuard } from './authentication.guard';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        NavBarComponent,
        FaComponent,
        LoadingComponent,
        CommentComponent,
        CommentFormComponent,
        routedComponents,
    ],
    providers: [
        AuthenticationGuard,

        PostService,
        UserService,
        EventsService,
        ThreadService,
        CommentService,
        AuthenticationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }