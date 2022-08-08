/**
 * Created by Vincent Ma on 8/24/16.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main/main.component';
import { NavBarComponent } from './navbar/navbar.component';
import { CommentComponent } from './post/comment.component';
import { CommentFormComponent } from './post/comment-form.component';
import { routedComponents, routing } from './old.app.routing';

import { PhotoPostService } from './photo-post/photo-post.service';
import { UserService } from './authentication/user.service';
import { EventsService } from './old.events.service';
import { StoriesService } from './services/stories.service';
import { CommentService } from './post/comment.service';
import { AuthenticationService } from './authentication/authentication.service';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { HttpClientModule } from '@angular/common/http';
import {MainModule} from "./main.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    MainModule
  ],
  declarations: [
    MainComponent,
    NavBarComponent,
    CommentComponent,
    CommentFormComponent,
    routedComponents
  ],
  providers: [
    AuthenticationGuard,
    PhotoPostService,
    UserService,
    EventsService,
    StoriesService,
    CommentService,
    AuthenticationService
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
