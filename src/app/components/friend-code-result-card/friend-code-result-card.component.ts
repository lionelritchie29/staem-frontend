import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { AllFriendsByUserIdGqlService } from 'src/app/services/gql/query/all-friends-by-user-id-gql.service';

@Component({
  selector: 'app-friend-code-result-card',
  templateUrl: './friend-code-result-card.component.html',
  styleUrls: ['./friend-code-result-card.component.scss']
})
export class FriendCodeResultCardComponent implements OnInit {

  @Input() user: UserAccount;
  @Output() addFriend: EventEmitter<any> = new EventEmitter();
  profileImgUrl: string = '';
  isFriend: boolean = false;

  constructor(
    private authService: AuthService,
    private allFriendsByUserIdGqlService: AllFriendsByUserIdGqlService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    if (userId == this.user.id) this.isFriend = true;
    this.checkFriend(userId);
    this.profileImgUrl = getUserImageUrl(this.user.profile.profilePictureUrl);
  }

  checkFriend(userId: number) {
    this.allFriendsByUserIdGqlService
      .watch({userId})
      .valueChanges
      .pipe(map(res => res.data.friendsByUserId))
      .subscribe(friends => {
        friends.forEach(friend => {
          if (this.user.id === friend.id) {
            this.isFriend = true;
          } 
        });
      })
  }

  onAdd() {
    this.addFriend.emit(this.user.id);
  }

}
