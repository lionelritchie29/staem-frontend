import { Component, Input, OnInit } from '@angular/core';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-friend-list-card',
  templateUrl: './friend-list-card.component.html',
  styleUrls: ['./friend-list-card.component.scss']
})
export class FriendListCardComponent implements OnInit {

  @Input() friend: UserAccount;
  profileImgUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.friend.profile.profilePictureUrl);
  }

}
