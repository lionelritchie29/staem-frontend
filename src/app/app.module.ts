import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha'

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
import { LoginComponent } from './pages/login/login.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SelfComponent } from './pages/checkout/self/self.component';
import { GiftComponent } from './pages/checkout/gift/gift.component';
import { ConfirmCheckoutComponent } from './pages/checkout/confirm-checkout/confirm-checkout.component';
import { RegisterComponent } from './pages/register/register.component';
import { RedeemWalletComponent } from './pages/redeem-wallet/redeem-wallet.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { BadgeComponent } from './components/badge/badge.component';
import { FriendCardComponent } from './components/friend-card/friend-card.component';
import { UserGameCardComponent } from './components/user-game-card/user-game-card.component';
import { UserReviewCardComponent } from './components/user-review-card/user-review-card.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { FriendListComponent } from './pages/friends/friend-list/friend-list.component';
import { AddFriendComponent } from './pages/friends/add-friend/add-friend.component';
import { PendingInviteComponent } from './pages/friends/pending-invite/pending-invite.component';
import { FriendListCardComponent } from './components/friend-list-card/friend-list-card.component';
import { FriendCodeResultCardComponent } from './components/friend-code-result-card/friend-code-result-card.component';
import { FriendInviteCardComponent } from './components/friend-invite-card/friend-invite-card.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ManageGameComponent } from './pages/manage-game/manage-game.component';
import { ManagePromoComponent } from './pages/manage-promo/manage-promo.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { ManageGameViewComponent } from './pages/manage-game/manage-game-view/manage-game-view.component';
import { ManageGameCardComponent } from './components/manage-game-card/manage-game-card.component';
import { ManageGameAddComponent } from './pages/manage-game/manage-game-add/manage-game-add.component';
import { ManagePromoViewComponent } from './pages/manage-promo/manage-promo-view/manage-promo-view.component';
import { ManagePromoAddComponent } from './pages/manage-promo/manage-promo-add/manage-promo-add.component';

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
    LoginComponent,
    CheckoutComponent,
    SelfComponent,
    GiftComponent,
    ConfirmCheckoutComponent,
    RegisterComponent,
    RedeemWalletComponent,
    ProfileComponent,
    BadgeComponent,
    FriendCardComponent,
    UserGameCardComponent,
    UserReviewCardComponent,
    FriendsComponent,
    FriendListComponent,
    AddFriendComponent,
    PendingInviteComponent,
    FriendListCardComponent,
    FriendCodeResultCardComponent,
    FriendInviteCardComponent,
    AdminLoginComponent,
    ManageGameComponent,
    ManagePromoComponent,
    ManageUserComponent,
    ManageGameViewComponent,
    ManageGameCardComponent,
    ManageGameAddComponent,
    ManagePromoViewComponent,
    ManagePromoAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }