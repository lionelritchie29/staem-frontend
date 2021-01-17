import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "search", component: SearchGameComponent},
  {path: "game/:id", component: GameDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
