import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getGameImageUrl } from 'src/app/globals';
import { UserWishlist } from 'src/app/models/user-wishlist';
import { AuthService } from 'src/app/services/auth.service';

const REMOVE_WISHLIST = gql`
  mutation deleteWishlist($userId: Int, $gameId: Int) {
    deleteWishlist(userId: $userId, gameId: $gameId)
  }
`;

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss'],
})
export class WishlistCardComponent implements OnInit {
  @Input() wishlist: UserWishlist;
  imgUrl: string = '';

  constructor(private apollo: Apollo, private authService: AuthService) {}

  ngOnInit(): void {
    this.imgUrl = getGameImageUrl(this.wishlist.game.id, 'header.jpg');
  }

  onRemove(): void {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .mutate({
        mutation: REMOVE_WISHLIST,
        variables: { userId, gameId: this.wishlist.game.id },
      })
      .pipe(map((res) => (<any>res.data).deleteWishlist))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Delete success!');
          window.location.reload();
        } else {
          alert('Oops.. failed when deleting this wishlist.');
        }
      });
  }
}
