/**
 * Created by vincentma on 8/24/16.
 */

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostsComponent } from './post/posts.component';
import { NotFoundComponent } from './notfound.component';
import { SignInComponent } from './user/signin.component';
import { SignUpComponent } from './user/signup.component';
import { LoadingComponent } from './loading.component';
import { ThreadsComponent } from './forum/threads.component';
import { ThreadFormComponent } from './forum/thread-form.component';
import { ThreadComponent } from './forum/thread.component';
import {EditThreadComponent} from "./forum/editthread.component";

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'posts',
        component: PostsComponent,
    },
    {
        path: 'forum',
        component: ThreadsComponent,
    },
    {
        path: 'thread/:id',
        component: ThreadComponent,
    },
    {
        path: 'thread/new',
        component: ThreadFormComponent,
    },
    {
        path: 'threads/edit/:id',
        component: EditThreadComponent,
    },
    {
        path: 'account/signin',
        component: SignInComponent,
    },
    {
        path: 'account/signup',
        component: SignUpComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [
    HomeComponent,
    PostsComponent,
    ThreadsComponent,
    ThreadComponent,
    ThreadFormComponent,
    EditThreadComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    LoadingComponent
];
