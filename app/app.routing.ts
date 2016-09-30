/**
 * Created by vincentma on 8/24/16.
 */

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PhotoPostsComponent } from './photo-post/posts.component';
import { NotFoundComponent } from './notfound.component';
import { LoadingComponent } from './loading.component';
import { PostsComponent } from './post/posts.component';
import { PostFormComponent } from './post/post-form.component';
import { PostComponent } from './post/post.component';
import { EditPostComponent } from './post/post-edit.component';
import { HoldComponent } from './hold.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { UserProfileComponent } from './authentication/user-profile.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'user/profile',
        component: UserProfileComponent,
    },
    {
        path: 'photo-posts',
        component: PhotoPostsComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'posts',
        component: PostsComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'post/new',
        component: PostFormComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'post/:id',
        component: PostComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: 'post/edit/:id',
        component: EditPostComponent,
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
    PhotoPostsComponent,
    PostsComponent,
    PostComponent,
    PostFormComponent,
    EditPostComponent,
    NotFoundComponent,
    LoadingComponent,
    HoldComponent,
    UserProfileComponent,
];
