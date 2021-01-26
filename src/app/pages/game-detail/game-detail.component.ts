import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { CartService } from 'src/app/services/cart.service';
import { GameByIdGqlService } from 'src/app/services/gql/query/game-by-id-gql.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent implements OnInit {

  game: Game;

  constructor(
    private route: ActivatedRoute,
    private gameByIdGqlService: GameByIdGqlService,
    private cartService: CartService
  ) {
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getGameById(params["id"]);
    });
  }

  getGameById(gameId: number): void {
    this.gameByIdGqlService
      .watch({id: gameId})
      .valueChanges
      .pipe(map(res => res.data))
      .subscribe(res => {
        this.game = res.game
      });
  }

  addToCart() {
    this.cartService.add(this.game);
    this.cartService.get();
  }

}
