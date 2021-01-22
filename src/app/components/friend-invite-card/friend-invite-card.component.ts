import { Component, Input, OnInit } from '@angular/core';
import { getUserImageUrl } from 'src/app/globals';
import { FriendRequest } from 'src/app/models/friend-request';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-friend-invite-card',
  templateUrl: './friend-invite-card.component.html',
  styleUrls: ['./friend-invite-card.component.scss']
})
export class FriendInviteCardComponent implements OnInit {

  @Input() request: FriendRequest;
  @Input() isReceivedRequest: boolean;
  profileImgUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.request.friend.profile.profilePictureUrl);
  }

}
