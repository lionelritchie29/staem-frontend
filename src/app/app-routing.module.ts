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

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchGameComponent},
  {path: 'game/:id', component: GameDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'redeem-wallet', component: RedeemWalletComponent},
  {path: 'profile/:userCustomUrl', component: ProfileComponent},
  {
    path: 'profile/:userCustomUrl/friends', 
    component: FriendsComponent,
    children: [
      {path: '', component: FriendListComponent},
      {path: 'add', component: AddFriendComponent},
      {path: 'pending', component: PendingInviteComponent},
    ],
  },
  {
    path: 'checkout', 
    component: CheckoutComponent,
    children: [
      {path: 'self', component: SelfComponent},
      {path: 'gift', component: GiftComponent},
    ],
  },
  {path: 'admin', component: AdminLoginComponent},
  {
    path: 'admin/manage-game', 
    component: ManageGameComponent,
    children: [
      {path: '', component: ManageGameViewComponent},
      {path: 'add', component: ManageGameAddComponent},
    ]
  },
  {
    path: 'admin/manage-promo', 
    component: ManagePromoComponent,
    children: [
      {path: '', component: ManagePromoViewComponent},
      {path: 'add', component: ManagePromoAddComponent},
      {path: 'update/:id', component: ManagePromoUpdateComponent}
    ]
  },
  {
    path: 'admin/manage-user', 
    component: ManageUserComponent,
    children: [
      // {path: '', component: ManageGameViewComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
