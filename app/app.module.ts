/**
 * Created by vincentma on 8/24/16.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NavBarComponent } from './navbar/navbar.component';
import { FaComponent } from 'angular2-fontawesome/components';
import { LoadingComponent } from './loading.component';
import { CommentComponent } from './post/comment.component';
import { CommentFormComponent } from './post/comment-form.component';
import { routing, routedComponents } from './app.routing';

import { PhotoPostService } from './photo-post/photo-post.service';
import { UserService } from './authentication/user.service';
import { EventsService } from './events.service';
import { PostService } from './post/post.service';
import { CommentService } from './post/comment.service';
import { AuthenticationService } from './authentication/authentication.service';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { AUTH_PROVIDERS } from 'angular2-jwt';

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
        AUTH_PROVIDERS,

        PhotoPostService,
        UserService,
        EventsService,
        PostService,
        CommentService,
        AuthenticationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }