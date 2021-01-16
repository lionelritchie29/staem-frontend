import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchGameComponent } from './pages/search-game/search-game.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "search", component: SearchGameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
