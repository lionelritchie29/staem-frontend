import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUserImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { UserAccount } from 'src/app/models/user-account';
import { UserComment } from 'src/app/models/user-comment';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { AllFriendsByUserIdGqlService } from 'src/app/services/gql/query/all-friends-by-user-id-gql.service';
import { GetCommentsByUserIdGqlService } from 'src/app/services/gql/query/get-comments-by-user-id-gql.service';
import { GetGamesByUserIdGqlService } from 'src/app/services/gql/query/get-games-by-user-id-gql.service';
import { GetUserByUrlGqlService } from 'src/app/services/gql/query/get-user-by-url-gql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  games: Game[] = [];
  friends: UserAccount[] = [];
  comments: UserComment[] = [];

  currentUser: UserAccount;
  loggedUser: UserAccount = null;
  profileImgUrl: string;
  isFriend: boolean = false;

  constructor(
    private allFriendsByUserIdGqlService: AllFriendsByUserIdGqlService,
    private getUserByUrlGqlService: GetUserByUrlGqlService,
    private getUserByIdGqlService: GetUserByIdGqlService,
    private getGamesByUserIdGqlService: GetGamesByUserIdGqlService,
    private getCommentsByUserIdGqlService: GetCommentsByUserIdGqlService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const url = params['userCustomUrl'];
      this.getUser(url);
    })

    const userId = this.authService.getLoggedInUserId();
    if(userId != null) {
      this.getUserByIdGqlService
        .watch({id: userId})
        .valueChanges
        .subscribe(res => this.loggedUser = res.data.user);
    }

  }

  getUser(customUrl: string): void {
    this.getUserByUrlGqlService
    .watch({url: customUrl})
    .valueChanges
    .subscribe(res => {
      this.currentUser = res.data.userByAccountName;
      this.profileImgUrl = 
        getUserImageUrl(this.currentUser.profile.profilePictureUrl);
        this.getFriends();
        this.getGames();
        this.getComments();
      });
  }

  getFriends():void {
    this.allFriendsByUserIdGqlService
      .watch({userId: this.currentUser.id})
      .valueChanges
      .subscribe(res => {
        this.friends = res.data.friendsByUserId;
        if(this.loggedUser != null) {
          const filtered = this.friends
            .filter(friend => friend.id === this.loggedUser.id)

          if (filtered.length > 0) this.isFriend = true;
        }
      });
  }

  getGames(): void {
    this.getGamesByUserIdGqlService
      .watch({id: this.currentUser.id})
      .valueChanges
      .subscribe(res => {
        this.games = res.data.gamesByUserId;
      });
  }

  getComments(): void {
    this.getCommentsByUserIdGqlService
      .watch({id: this.currentUser.id})
      .valueChanges
      .subscribe(res => {
        this.comments = res.data.commentsByUserId;
      });
  } 

}
