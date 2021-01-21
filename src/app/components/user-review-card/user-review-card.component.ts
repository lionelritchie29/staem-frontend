import { Component, Input, OnInit } from '@angular/core';
import { convertDateTimeToDate, getUserImageUrl, getMonthName } from 'src/app/globals';
import { UserComment } from 'src/app/models/user-comment';

@Component({
  selector: 'app-user-review-card',
  templateUrl: './user-review-card.component.html',
  styleUrls: ['./user-review-card.component.scss']
})
export class UserReviewCardComponent implements OnInit {

  @Input() comment: UserComment;
  profilePictUrl: string = '';
  convertedDate: Date;
  monthStr: string;

  constructor() { }

  ngOnInit(): void {
    this.profilePictUrl = 
      getUserImageUrl(this.comment.srcUser.profile.profilePictureUrl);
    this.convertedDate = convertDateTimeToDate(this.comment.createdAt);
    this.monthStr = getMonthName(this.convertedDate.getMonth() + 1);
  }

}
