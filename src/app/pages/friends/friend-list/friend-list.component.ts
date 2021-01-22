import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { AllFriendsByUserIdGqlService } from 'src/app/services/gql/query/all-friends-by-user-id-gql.service';
import { GetUserByUrlGqlService } from 'src/app/services/gql/query/get-user-by-url-gql.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  initOnlineFriends: UserAccount[] = [];
  initOfflineFriends: UserAccount[] = [];
  onlineFriends: UserAccount[] = [];
  offlineFriends: UserAccount[] = [];
  searchInput: string = '';
  currentUserId: number;

  constructor(
    private allFriendsByUserIdGqlService: AllFriendsByUserIdGqlService,
    private getUserByUrlGqlService: GetUserByUrlGqlService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getUserId(params["userCustomUrl"]);
    })
  }

  getUserId(url: string): void {
    this.getUserByUrlGqlService
      .watch({url})
      .valueChanges
      .pipe(map(res => res.data.userByAccountName.id))
      .subscribe(userId => {
        this.getFriends(userId);
        this.currentUserId = userId;
      })
  }

  getFriends(userId: number): void {
    this.allFriendsByUserIdGqlService
    .watch({userId})
    .valueChanges
    .pipe(map(res => res.data.friendsByUserId))
    .subscribe(friends => {
      friends.forEach(friend => {
        if (friend.status == 'offline') {
          this.offlineFriends.push(friend);
          this.initOfflineFriends.push(friend);
        }else {
          this.onlineFriends.push(friend);
          this.initOnlineFriends.push(friend);
        }
      });
    });
  }

  onChange() {
    console.log(this.searchInput)
    this.offlineFriends = this.initOfflineFriends;
    this.onlineFriends = this.initOnlineFriends;

    this.offlineFriends = 
      this.offlineFriends.filter(friend => 
        friend.profile.displayName.toLowerCase().includes(this.searchInput)
      )

    this.onlineFriends =
        this.onlineFriends.filter(friend => 
          friend.profile.displayName.toLowerCase().includes(this.searchInput))
  }

}
