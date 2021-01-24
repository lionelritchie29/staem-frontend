import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { AllGamesGqlService } from 'src/app/services/gql/query/all-games-gql.service';


const DELETE_GAME = gql`
  mutation deleteGame($id: Int) {
    deleteGame(id:$id)
  }
`;

@Component({
  selector: 'app-manage-game-view',
  templateUrl: './manage-game-view.component.html',
  styleUrls: ['./manage-game-view.component.scss']
})
export class ManageGameViewComponent implements OnInit {

  gameList: Game[] = [];

  constructor(
    private allGamesGqlService: AllGamesGqlService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.allGamesGqlService.watch()
    .valueChanges
    .pipe(map(res => res.data.games))
    .subscribe(games => this.gameList = games);
  }

  onDelete(id: number) {
    this.apollo.mutate({
      mutation: DELETE_GAME,
      variables: {id}
    })
    .pipe(map(res => (<any>res.data).deleteGame))
    .subscribe(success => {
      if(success) {
        alert("Delete Success");
        window.location.reload();
      }else {
        alert("Delete Failed");
      }
    })
  }

}
