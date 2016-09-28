/**
 * Created by vincentma on 8/24/16.
 */

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './post/posts.component';
import { NotFoundComponent } from './notfound.component';
import { LoadingComponent } from './loading.component';
import { ThreadsComponent } from './forum/threads.component';
import { ThreadFormComponent } from './forum/thread-form.component';
import { ThreadComponent } from './forum/thread.component';
import { EditThreadComponent } from './forum/editthread.component';
import { HoldComponent } from './hold.component';
import { AuthenticationGuard } from './authentication.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'forum',
        component: ThreadsComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'thread/new',
        component: ThreadFormComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'thread/:id',
        component: ThreadComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'thread/edit/:id',
        component: EditThreadComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'hold',
        component: HoldComponent,
        canActivate: [AuthenticationGuard],
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
    LoadingComponent,
    HoldComponent,
];
