import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { GiftComponent } from './pages/checkout/gift/gift.component';
import { SelfComponent } from './pages/checkout/self/self.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RedeemWalletComponent } from './pages/redeem-wallet/redeem-wallet.component';
import { RegisterComponent } from './pages/register/register.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchGameComponent},
  {path: 'game/:id', component: GameDetailComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'redeem-wallet', component: RedeemWalletComponent},
  {
    path: 'checkout', 
    component: CheckoutComponent,
    children: [
      {path: 'self', component: SelfComponent},
      {path: 'gift', component: GiftComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
