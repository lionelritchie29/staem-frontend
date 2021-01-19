import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "search", component: SearchGameComponent},
  {path: "game/:id", component: GameDetailComponent},
  {path: "cart", component: CartComponent},
  {path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
