import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { Game } from 'src/app/models/game';
import { UserAccount } from 'src/app/models/user-account';
import { UserComment } from 'src/app/models/user-comment';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { CreateCommentGqlService } from 'src/app/services/gql/mutation/create-comment-gql.service';
import { CreateUserReportGqlService } from 'src/app/services/gql/mutation/create-user-report-gql.service';
import { AllFriendsByUserIdGqlService } from 'src/app/services/gql/query/all-friends-by-user-id-gql.service';
import { GetCommentsByUserIdGqlService } from 'src/app/services/gql/query/get-comments-by-user-id-gql.service';
import { GetGamesByUserIdGqlService } from 'src/app/services/gql/query/get-games-by-user-id-gql.service';
import { GetUserByUrlGqlService } from 'src/app/services/gql/query/get-user-by-url-gql.service';

const CREATE_FRIEND_REQUEST = gql`
  mutation createFriendRequest($from:Int, $to:Int) {
    createFriendRequest(fromId:$from, toId:$to)
  }
`;

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
    private createUserReportGqlService: CreateUserReportGqlService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private fb: FormBuilder,
    private createCommentGqlService: CreateCommentGqlService,
    private apollo: Apollo,
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

  onAddFriend() {
    if (this.loggedUser != null) {
      console.log(this.loggedUser.id)
      console.log(this.currentUser.id)
      this.apollo.mutate({
        mutation: CREATE_FRIEND_REQUEST,
        variables: {from: this.loggedUser.id, to: this.currentUser.id}
      })
      .pipe(map(res => (<any>res.data).createFriendRequest))
      .subscribe(isSuccess => {
        if (isSuccess) {
          alert('Add friend success!');
        } else {
          alert('Oops, an error occured when adding this friend\nor you have already sent friend request for this user.');
        }
      })
    }
  }

  onReport() {
    const reason = prompt('Input your reason');

    this.createUserReportGqlService.mutate({
      "userId": this.currentUser.id,
      "reporterId": this.loggedUser.id,
      "reason": reason
    }).pipe(map(res => (<any>res.data).createReport))
    .subscribe(isSuccess => {
      if (isSuccess) {
        alert("Report Success!");
      } else {
        alert("Oops.. you already reported this user.");
      }
    });
  }

}
