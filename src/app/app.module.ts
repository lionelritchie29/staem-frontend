import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { FeaturedCardComponent } from './components/featured-card/featured-card.component';
import { SpecialOffersComponent } from './components/special-offers/special-offers.component';
import { SpecialOffersCardComponent } from './components/special-offers-card/special-offers-card.component';
import { CommunityRecommendComponent } from './components/community-recommend/community-recommend.component';
import { CommunityRecommendCardComponent } from './components/community-recommend-card/community-recommend-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SidebarComponent,
    SearchBarComponent,
    FeaturedComponent,
    FeaturedCardComponent,
    SpecialOffersComponent,
    SpecialOffersCardComponent,
    CommunityRecommendComponent,
    CommunityRecommendCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
