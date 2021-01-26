import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { GameByIdGqlService } from 'src/app/services/gql/query/game-by-id-gql.service';

const CREATE_WISHLIST = gql`
  mutation createWishlist($userId: Int, $gameId: Int) {
    createWishlist(userId: $userId, gameId: $gameId) {
      userId
      game {
        id
      }
      createdAt
    }
  }
`;

const GET_CURRENT_USER_GAMES = gql`
  query gamesByUserId($id: Int) {
    gamesByUserId(id: $id) {
      id
    }
  }
`;

const GET_CURRENT_USER_IMG = gql`
  query getUser($id: Int) {
    user(id: $id) {
      id
      profile {
        profilePictureUrl
      }
    }
  }
`;

const CREATE_REVIEW = gql`
  mutation createGameReview(
    $userId: Int
    $gameId: Int
    $content: String
    $isRecommended: Boolean
  ) {
    createGameReview(
      userId: $userId
      gameId: $gameId
      content: $content
      isRecommended: $isRecommended
    )
  }
`;

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss'],
})
export class GameDetailComponent implements OnInit {
  game: Game;
  userOwnedGames: Game[] = [];
  isOwned: boolean = false;
  currentUserImg: string = '';
  errorMsg: string = '';

  reviewForm: FormGroup = this.fb.group({
    content: ['', Validators.required],
    recommended: ['1'],
  });

  constructor(
    private route: ActivatedRoute,
    private gameByIdGqlService: GameByIdGqlService,
    private cartService: CartService,
    private apollo: Apollo,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getGameById(params['id']);
      this.getCurrentUserImg();
    });
  }

  getGameById(gameId: number): void {
    this.gameByIdGqlService
      .watch({ id: gameId })
      .valueChanges.pipe(map((res) => res.data))
      .subscribe((res) => {
        this.game = res.game;
        this.getAndCheckUserOwnedGames();
      });
  }

  getAndCheckUserOwnedGames(): void {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .watchQuery({
        query: GET_CURRENT_USER_GAMES,
        variables: { id: userId },
      })
      .valueChanges.pipe(map((res) => (<any>res.data).gamesByUserId))
      .subscribe((games: Game[]) => {
        if (games.some((game) => game.id === this.game.id)) {
          this.isOwned = true;
        }
      });
  }

  getCurrentUserImg() {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .query({
        query: GET_CURRENT_USER_IMG,
        variables: { id: userId },
      })
      .pipe(map((res) => (<any>res.data).user))
      .subscribe(
        (user) =>
          (this.currentUserImg = getUserImageUrl(
            user.profile.profilePictureUrl
          ))
      );
  }

  addToCart() {
    this.cartService.add(this.game);
    this.cartService.get();
  }

  addToWishlist() {
    const userId = this.authService.getLoggedInUserId();

    this.apollo
      .mutate({
        mutation: CREATE_WISHLIST,
        variables: { userId: userId, gameId: this.game.id },
      })
      .pipe(map((res) => (<any>res.data).createWishlist))
      .subscribe((wishlist) => {
        if (wishlist.game.id != 0) {
          alert('Added to wishlist!');
        } else {
          alert('Oops, You have already added this game to the wishlist!');
        }
      });
  }

  onPostReview() {
    if (this.reviewForm.status === 'INVALID') {
      this.errorMsg = 'All field must be filled';
    } else {
      this.errorMsg = '';
      const isRecommended: boolean =
        this.reviewForm.get('recommended').value == '1' ? true : false;

      this.apollo
        .mutate({
          mutation: CREATE_REVIEW,
          variables: {
            userId: this.authService.getLoggedInUserId(),
            gameId: this.game.id,
            content: this.reviewForm.get('content').value,
            isRecommended,
          },
        })
        .pipe(map((res) => (<any>res.data).createGameReview))
        .subscribe((isSuccess) => {
          if (isSuccess) {
            alert('Post review success!');
            window.location.reload();
          } else {
            alert('Oops. Error when post review');
          }
        });
    }
  }
}
