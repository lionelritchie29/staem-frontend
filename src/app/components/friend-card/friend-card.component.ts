import { Component, Input, OnInit } from '@angular/core';
import { getMiniProfileBgUrl, getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent implements OnInit {
  @Input() friend: UserAccount;
  showMiniProfile: boolean = false;
  profileImgUrl: string = '';
  miniProfileImgUrl: string = '';

  constructor() {}

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.friend.profile.profilePictureUrl);
    this.miniProfileImgUrl = getMiniProfileBgUrl(
      this.friend.profile.miniProfileBackgroundUrl
    );
  }

  onMouseEnter() {
    this.showMiniProfile = true;
  }

  onMouseLeave() {
    this.showMiniProfile = false;
  }
}
