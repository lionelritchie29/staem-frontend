import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { AllGamesGqlService } from 'src/app/services/gql/query/all-games-gql.service';

@Component({
  selector: 'app-manage-game-view',
  templateUrl: './manage-game-view.component.html',
  styleUrls: ['./manage-game-view.component.scss']
})
export class ManageGameViewComponent implements OnInit {

  gameList: Game[] = [];

  constructor(
    private allGamesGqlService: AllGamesGqlService
  ) { }

  ngOnInit(): void {
    this.allGamesGqlService.watch()
    .valueChanges
    .pipe(map(res => res.data.games))
    .subscribe(games => this.gameList = games);
  }

}
