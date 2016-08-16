// get rid of "error TS2304: Cannot find name ..."
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>


import {ROUTER_PROVIDERS} from "angular2/router";
import {HTTP_PROVIDERS} from "angular2/http";

import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS]);