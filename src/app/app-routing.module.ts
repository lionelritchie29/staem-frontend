import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { GiftComponent } from './pages/checkout/gift/gift.component';
import { SelfComponent } from './pages/checkout/self/self.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FriendsComponent } from './pages/friends/friends.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RedeemWalletComponent } from './pages/redeem-wallet/redeem-wallet.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';
import { FriendListComponent } from './pages/friends/friend-list/friend-list.component';
import { AddFriendComponent } from './pages/friends/add-friend/add-friend.component';
import { PendingInviteComponent } from './pages/friends/pending-invite/pending-invite.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ManageGameComponent } from './pages/manage-game/manage-game.component';
import { ManageGameViewComponent } from './pages/manage-game/manage-game-view/manage-game-view.component';
import { ManagePromoComponent } from './pages/manage-promo/manage-promo.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { ManageGameAddComponent } from './pages/manage-game/manage-game-add/manage-game-add.component';
import { ManagePromoViewComponent } from './pages/manage-promo/manage-promo-view/manage-promo-view.component';
import { ManagePromoAddComponent } from './pages/manage-promo/manage-promo-add/manage-promo-add.component';
import { ManagePromoUpdateComponent } from './pages/manage-promo/manage-promo-update/manage-promo-update.component';
import { ManageUserViewComponent } from './pages/manage-user/manage-user-view/manage-user-view.component';
import { ManageUserUnsuspendRequestComponent } from './pages/manage-user/manage-user-unsuspend-request/manage-user-unsuspend-request.component';
import { MatureContentGuardService } from './services/mature-content-guard.service';
import { WarningMatureContentComponent } from './pages/warning-mature-content/warning-mature-content.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AdminUserGuardService } from './services/admin-user-guard.service';
import { AdminPromoGuardService } from './services/admin-promo-guard.service';
import { AdminGameGuardService } from './services/admin-game-guard.service';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditProfileInfoComponent } from './pages/edit-profile/edit-profile-info/edit-profile-info.component';
import { EditProfileAvatarComponent } from './pages/edit-profile/edit-profile-avatar/edit-profile-avatar.component';
import { EditProfileBackgroundComponent } from './pages/edit-profile/edit-profile-background/edit-profile-background.component';
import { EditProfileMiniBackgroundComponent } from './pages/edit-profile/edit-profile-mini-background/edit-profile-mini-background.component';
import { EditProfileThemeComponent } from './pages/edit-profile/edit-profile-theme/edit-profile-theme.component';
import { EditProfileBadgeComponent } from './pages/edit-profile/edit-profile-badge/edit-profile-badge.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PointShopComponent } from './pages/point-shop/point-shop.component';
import { TestTemplateComponent } from './pages/test-template/test-template.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { ChatComponent } from './pages/chat/chat.component';
import { MarketComponent } from './pages/market/market.component';
import { MarketDetailComponent } from './pages/market-detail/market-detail.component';
import { CommunityComponent } from './pages/community/community.component';
import { ReviewDetailsComponent } from './pages/review-details/review-details.component';
import { DiscussionDetailComponent } from './pages/discussion-detail/discussion-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { animationState: 'Home' } },
  { path: 'test-template', component: TestTemplateComponent },
  {
    path: 'search',
    component: SearchGameComponent,
    data: { animationState: 'Search' },
  },
  {
    path: 'inventory',
    component: InventoryComponent,
    canActivate: [AuthGuardService],
    data: { animationState: 'Inventory' },
  },
  {
    path: 'market',
    component: MarketComponent,
    data: { animationState: 'Market' },
  },
  {
    path: 'market/:gameItemId',
    component: MarketDetailComponent,
    data: { animationState: 'MarketDetail' },
  },
  {
    path: 'chat/:recipientId',
    component: ChatComponent,
    canActivate: [AuthGuardService],
    data: { animationState: 'Chat' },
  },
  {
    path: 'game/:id',
    component: GameDetailComponent,
    canActivate: [MatureContentGuardService],
    data: { animationState: 'Game' },
  },
  {
    path: 'agecheck/:id',
    component: WarningMatureContentComponent,
    data: { animationState: 'AgeCheck' },
  },
  { path: 'cart', component: CartComponent, data: { animationState: 'Cart' } },
  {
    path: 'wishlist',
    component: WishlistComponent,
    data: { animationState: 'Wishlist' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { animationState: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animationState: 'Register' },
  },
  {
    path: 'redeem-wallet',
    component: RedeemWalletComponent,
    data: { animationState: 'RedeemWallet' },
  },
  {
    path: 'profile/:userCustomUrl',
    component: ProfileComponent,
    data: { animationState: 'Profile' },
  },
  { path: 'points', redirectTo: 'points/shop', pathMatch: 'full' },
  {
    path: 'points/shop',
    component: PointShopComponent,
    data: { animationState: 'Point Shop' },
  },
  {
    path: 'community',
    component: CommunityComponent,
    data: { animationState: 'Community' },
  },
  {
    path: 'review/:id',
    component: ReviewDetailsComponent,
    data: { animationState: 'ReviewDetail' },
  },
  {
    path: 'discussion/:id',
    component: DiscussionDetailComponent,
    data: { animationState: 'DiscussionDetail' },
  },
  {
    path: 'profile/:userCustomUrl/edit',
    component: EditProfileComponent,
    children: [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: EditProfileInfoComponent },
      { path: 'avatar', component: EditProfileAvatarComponent },
      { path: 'background', component: EditProfileBackgroundComponent },
      { path: 'miniprofile', component: EditProfileMiniBackgroundComponent },
      { path: 'theme', component: EditProfileThemeComponent },
      { path: 'favoritebadge', component: EditProfileBadgeComponent },
    ],
    data: { animationState: 'EditProfile' },
  },
  {
    path: 'profile/:userCustomUrl/friends',
    component: FriendsComponent,
    children: [
      { path: '', component: FriendListComponent },
      { path: 'add', component: AddFriendComponent },
      { path: 'pending', component: PendingInviteComponent },
    ],
    data: { animationState: 'Friend' },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      { path: 'self', component: SelfComponent },
      { path: 'gift', component: GiftComponent },
    ],
    canActivate: [AuthGuardService],
    data: { animationState: 'Checkout' },
  },
  { path: 'admin', component: AdminLoginComponent },
  {
    path: 'admin/manage-game',
    component: ManageGameComponent,
    children: [
      { path: '', component: ManageGameViewComponent },
      { path: 'add', component: ManageGameAddComponent },
    ],
    canActivate: [AdminGameGuardService],
    data: { animationState: 'ManageGame' },
  },
  {
    path: 'admin/manage-promo',
    component: ManagePromoComponent,
    children: [
      { path: '', component: ManagePromoViewComponent },
      { path: 'add', component: ManagePromoAddComponent },
      { path: 'update/:id', component: ManagePromoUpdateComponent },
    ],
    canActivate: [AdminPromoGuardService],
    data: { animationState: 'ManagePromo' },
  },
  {
    path: 'admin/manage-user',
    component: ManageUserComponent,
    children: [
      { path: '', component: ManageUserViewComponent },
      {
        path: 'unsuspend-request',
        component: ManageUserUnsuspendRequestComponent,
      },
    ],
    canActivate: [AdminUserGuardService],
    data: { animationState: 'ManageUser' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
