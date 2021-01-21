import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { AllFriendsByUserIdGqlService } from 'src/app/services/gql/query/all-friends-by-user-id-gql.service';
import { GetUserByUrlGqlService } from 'src/app/services/gql/query/get-user-by-url-gql.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  friends: UserAccount[] = [];
  currentUser: UserAccount;
  profileImgUrl: string;

  constructor(
    private allFriendsByUserIdGqlService: AllFriendsByUserIdGqlService,
    private getUserByUrlGqlService: GetUserByUrlGqlService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const url = params['userCustomUrl'];
      this.getUser(url);
    })
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
      });
  }

  getFriends():void {
    this.allFriendsByUserIdGqlService
      .watch({userId: this.currentUser.id})
      .valueChanges
      .subscribe(res => this.friends = res.data.friendsByUserId);
  }

}
