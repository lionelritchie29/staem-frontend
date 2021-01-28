import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { AllGamesGqlService } from 'src/app/services/gql/query/all-games-gql.service';
import { AllGamesLimitOffsetGqlService } from 'src/app/services/gql/query/all-games-limit-offset-gql.service';

const DELETE_GAME = gql`
  mutation deleteGame($id: Int) {
    deleteGame(id: $id)
  }
`;

@Component({
  selector: 'app-manage-game-view',
  templateUrl: './manage-game-view.component.html',
  styleUrls: ['./manage-game-view.component.scss'],
})
export class ManageGameViewComponent implements OnInit {
  gameList: Game[] = [];
  limit: number = 5;
  offset: number = 0;
  page: number = 1;
  totalPage: number = 1;

  constructor(
    private allGamesLimitOffsetGqlService: AllGamesLimitOffsetGqlService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.fetchGames(this.limit, this.offset);
  }

  fetchGames(limit: number, offset: number) {
    this.allGamesLimitOffsetGqlService
      .watch({
        limit,
        offset,
      })
      .valueChanges.pipe(map((res) => res.data.gamesLimitOffset))
      .subscribe((games) => {
        this.gameList = games.games;
        this.totalPage = games.totalCount / this.limit;
      });
  }

  onNext() {
    if (this.page == this.totalPage) return;

    this.page += 1;
    this.offset = (this.page - 1) * this.limit;
    this.fetchGames(this.limit, this.offset);
  }

  onPrev() {
    if (this.page == 1) return;

    this.page -= 1;
    this.offset = (this.page - 1) * this.limit;
    this.fetchGames(this.limit, this.offset);
  }

  onDelete(id: number) {
    this.apollo
      .mutate({
        mutation: DELETE_GAME,
        variables: { id },
      })
      .pipe(map((res) => (<any>res.data).deleteGame))
      .subscribe((success) => {
        if (success) {
          alert('Delete Success');
          window.location.reload();
        } else {
          alert('Delete Failed');
        }
      });
  }
}
