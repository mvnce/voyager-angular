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
import { routing, routedComponents } from './app.routing';

import { PostService } from './post.service';
import { UserService } from './user.service';
import { EventsService } from './events.service';


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

        routedComponents,
    ],
    providers: [
        PostService,
        UserService,
        EventsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }