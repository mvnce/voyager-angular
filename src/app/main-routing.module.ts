import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './utilities/notfound.component';
// import { UserProfileComponent } from './authentication/user-profile.component';
// import { PhotoPostsComponent } from './photo-post/posts.component';
// import { StoriesComponent } from './post/posts.component';
import { StoryFormComponent } from './stories/story-form.component';
import {StoriesComponent} from "./stories/stories.component";
// import { EditPostComponent } from './post/post-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // {
  //   path: 'user/profile',
  //   component: UserProfileComponent,
  // },
  // {
  //   path: 'photo-posts',
  //   component: PhotoPostsComponent,
  // },
  {
    path: 'stories',
    component: StoriesComponent,
  },
  {
    path: 'story/form',
    component: StoryFormComponent,
  },
  // {
  //   path: 'post/:id',
  //   component: PostComponent,
  // },
  // {
  //   path: 'post/edit/:id',
  //   component: EditPostComponent,
  // },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
