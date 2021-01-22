import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { getUserImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { UserAccount } from 'src/app/models/user-account';
import { UserComment } from 'src/app/models/user-comment';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { CreateCommentGqlService } from 'src/app/services/gql/mutation/create-comment-gql.service';
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
  loggedUserImgUrl: string;
  isFriend: boolean = false;

  commentForm = this.fb.group({
    content: ['', Validators.required],
  });

  constructor(
    private allFriendsByUserIdGqlService: AllFriendsByUserIdGqlService,
    private getUserByUrlGqlService: GetUserByUrlGqlService,
    private getUserByIdGqlService: GetUserByIdGqlService,
    private getGamesByUserIdGqlService: GetGamesByUserIdGqlService,
    private getCommentsByUserIdGqlService: GetCommentsByUserIdGqlService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private createCommentGqlService: CreateCommentGqlService
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
        .subscribe(res => {
          this.loggedUser = res.data.user;
          this.loggedUserImgUrl = 
            getUserImageUrl(this.loggedUser.profile.profilePictureUrl);
        });
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
          console.log(filtered)

          if (filtered.length > 0) this.isFriend = true;
          else this.isFriend = false;
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
  
  onPostComment() {
    if (this.commentForm.status === "INVALID") {
      alert('All field must be filled.');
    } else {
      this.createCommentGqlService.mutate({
        src: this.loggedUser.id,
        dest: this.currentUser.id,
        content: this.commentForm.get('content').value,
      })
      .subscribe(() => {
        alert('Success added comment!');
        window.location.reload();
      })
    }
  }

}
