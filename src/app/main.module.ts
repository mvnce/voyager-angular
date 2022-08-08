import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { StoryFormComponent } from './stories/story-form.component';
import {StoriesService} from "./services/stories.service";
import {HttpClientModule} from "@angular/common/http";
import {StoriesComponent} from "./stories/stories.component";
import {LoaderComponent} from "./loader/loader.component";

@NgModule({
  declarations: [
    MainComponent,
    NavBarComponent,
    HomeComponent,
    LoaderComponent,
    StoriesComponent,
    StoryFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MainRoutingModule,
    NgbModule
  ],
  providers: [
    StoriesService
  ],
  exports: [
    LoaderComponent
  ],
  bootstrap: [
    MainComponent
  ]
})
export class MainModule { }
