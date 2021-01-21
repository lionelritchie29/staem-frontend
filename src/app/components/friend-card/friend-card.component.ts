import { Component, Input, OnInit } from '@angular/core';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss']
})
export class FriendCardComponent implements OnInit {

  @Input() friend: UserAccount;
  showMiniProfile:boolean = false;
  profileImgUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.friend.profile.profilePictureUrl)
  }

  onMouseEnter() {
    this.showMiniProfile = true;
  }

  onMouseLeave() {
    this.showMiniProfile = false;
  }

}
