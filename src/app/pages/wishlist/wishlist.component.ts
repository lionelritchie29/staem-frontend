import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { UserWishlist } from 'src/app/models/user-wishlist';
import { AuthService } from 'src/app/services/auth.service';
import { GetWishlistByUserIdGqlService } from 'src/app/services/gql/query/get-wishlist-by-user-id-gql.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  wishlists: UserWishlist[] = [];
  imgUrl: string = '';

  constructor(
    private getWishlistByUserIdGqlService: GetWishlistByUserIdGqlService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    if (userId === null) {
      this.router.navigate(['/']);
    } else {
      this.getWishlistByUserIdGqlService
        .watch({ id: userId })
        .valueChanges.pipe(map((res) => res.data.wishlistByUserId))
        .subscribe((wishlists) => (this.wishlists = wishlists));
    }
  }
}
