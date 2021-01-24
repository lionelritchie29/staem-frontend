import { Component, Input, OnInit } from '@angular/core';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-manage-user-card',
  templateUrl: './manage-user-card.component.html',
  styleUrls: ['./manage-user-card.component.scss']
})
export class ManageUserCardComponent implements OnInit {

  @Input() user: UserAccount;
  profileImgUrl: string = '';
  showDetail: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.user.profile.profilePictureUrl);
  }

  onMouseEnter() {
    this.showDetail = true;
  }

  onMouseLeave() {
    this.showDetail = false;
  }

}
