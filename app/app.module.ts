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

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        ModalModule.forRoot(),
        BootstrapModalModule,
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