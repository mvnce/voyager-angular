// get rid of "error TS2304: Cannot find name ..."
///<reference path="../node_modules/angular2-in-memory-web-api/typings/browser.d.ts"/>

import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HTTP_PROVIDERS} from "@angular/http";

import {bootstrap}    from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";


bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);