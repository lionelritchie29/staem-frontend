import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { GameItem } from 'src/app/models/game-item';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserInventoryGqlService } from 'src/app/services/query/gql/get-user-inventory-gql.service';

const GET_GAME_TITLE = gql`
  query getGameTitle($id: Int) {
    game(id: $id) {
      id
      title
    }
  }
`;

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {
  loggedUser: UserAccount;
  inventory: GameItem[] = [];
  groupedInventory: any;
  tabHeaders: any[] = [];
  groupKeys: string[] = [];

  constructor(
    private authService: AuthService,
    private getUserInventoryGqlService: GetUserInventoryGqlService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    this.getUserInventoryGqlService
      .watch({ id: userId })
      .valueChanges.pipe(map((res) => res.data.user))
      .subscribe((user) => {
        this.loggedUser = user;
        this.inventory = user.inventory;
        this.groupInventory();
      });
  }

  groupInventory() {
    this.groupedInventory = this.inventory.reduce((r, a) => {
      r[a.game] = [...(r[a.game] || []), a];
      return r;
    }, {});
    console.log('group', this.groupedInventory);
    this.groupKeys = Object.keys(this.groupedInventory);

    this.groupKeys.forEach((gameId) => {
      this.apollo
        .query({
          query: GET_GAME_TITLE,
          variables: { id: parseInt(gameId) },
        })
        .pipe(map((res) => (<any>res.data).game))
        .subscribe((game) => {
          this.tabHeaders.push({ id: game.id, title: game.title });
        });
    });
  }

  // groupBy(array: Array<any>, key:string) {
  //   return array.reduce((result, curr) => {

  //   });
  // }
}
