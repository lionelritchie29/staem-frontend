import { Component, Input, OnInit } from '@angular/core';
import { convertDateTimeToDate, getMonthName } from 'src/app/globals';
import { GameReview } from 'src/app/models/game-review';

@Component({
  selector: 'app-recently-posted-review-card',
  templateUrl: './recently-posted-review-card.component.html',
  styleUrls: ['./recently-posted-review-card.component.scss']
})
export class RecentlyPostedReviewCardComponent implements OnInit {

  @Input() review: GameReview;
  convertedDate: string;

  constructor() { }

  ngOnInit(): void {
    const reviewDate = convertDateTimeToDate(this.review.reviewDateTime);
    console.log(reviewDate.getMonth())
    this.convertedDate = `${reviewDate.getDate()} ${getMonthName(reviewDate.getMonth()+1)}, ${reviewDate.getFullYear()}`
  }

}
