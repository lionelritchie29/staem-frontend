import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryTabsComponent } from './components/category-tabs/category-tabs.component';
import { CategoryTabComponent } from './components/category-tab/category-tab.component';
import { CategoryTabBodyComponent } from './components/category-tab-body/category-tab-body.component';
import { CategoryGameCardComponent } from './components/category-game-card/category-game-card.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';
import { SearchGameCardComponent } from './components/search-game-card/search-game-card.component';
import { SearchGameFilterCardComponent } from './components/search-game-filter-card/search-game-filter-card.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { GameDetailCardComponent } from './components/game-detail-card/game-detail-card.component';
import { SystemReqComponent } from './components/system-req/system-req.component';
import { GameReviewsComponent } from './components/game-reviews/game-reviews.component';
import { HelpfulReviewCardComponent } from './components/helpful-review-card/helpful-review-card.component';
import { RecentlyPostedReviewCardComponent } from './components/recently-posted-review-card/recently-posted-review-card.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
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
    CommunityRecommendCardComponent,
    CategoryTabsComponent,
    CategoryTabComponent,
    CategoryTabBodyComponent,
    CategoryGameCardComponent,
    SearchGameComponent,
    SearchGameCardComponent,
    SearchGameFilterCardComponent,
    GameDetailComponent,
    GameDetailCardComponent,
    SystemReqComponent,
    GameReviewsComponent,
    HelpfulReviewCardComponent,
    RecentlyPostedReviewCardComponent,
    CartComponent,
    CartCardComponent,
    ConfirmModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
