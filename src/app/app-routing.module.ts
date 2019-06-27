import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCardsComponent } from './user-cards/user-cards.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserRatingComponent } from './user-rating/user-rating.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'users', component: UserCardsComponent },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    children: [
      {path: 'overview', component: UserOverviewComponent},
      {path: 'rating', component: UserRatingComponent}
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AppComponent, UserCardsComponent, UserDetailComponent, UserOverviewComponent, UserRatingComponent]
