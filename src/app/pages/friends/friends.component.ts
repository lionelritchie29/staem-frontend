import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { url } from 'inspector';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { GetUserByUrlGqlService } from 'src/app/services/gql/query/get-user-by-url-gql.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  currentUser: UserAccount;
  profileImgUrl: string = '';
  loggedUserId: number = 0;

  constructor(
    private authService: AuthService,
    private getUserByUrlGqlService: GetUserByUrlGqlService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.loggedUserId = this.authService.getLoggedInUserId();
    this.route.params.subscribe(params => {
      this.getCurrentAndLoggedUser(params["userCustomUrl"]);
    })
  }

  getCurrentAndLoggedUser(customUrl) {
    this.getUserByUrlGqlService
      .watch({url: customUrl})
      .valueChanges
      .subscribe(res => {
          this.currentUser = res.data.userByAccountName;
          console.log(this.currentUser);
          this.profileImgUrl = getUserImageUrl(this.currentUser.profile.profilePictureUrl);
      })
  }



}
