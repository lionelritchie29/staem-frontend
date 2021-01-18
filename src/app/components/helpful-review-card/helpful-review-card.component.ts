import { Component, Input, OnInit } from '@angular/core';
import { convertDateTimeToDate, getMonthName } from 'src/app/globals';
import { GameReview } from 'src/app/models/game-review';

@Component({
  selector: 'app-helpful-review-card',
  templateUrl: './helpful-review-card.component.html',
  styleUrls: ['./helpful-review-card.component.scss']
})
export class HelpfulReviewCardComponent implements OnInit {

  @Input() review: GameReview;
  convertedDate: string;

  constructor() { }

  ngOnInit(): void {
    const reviewDate = convertDateTimeToDate(this.review.reviewDateTime);
    this.convertedDate = `${reviewDate.getDate()} ${getMonthName(reviewDate.getMonth()+1)}, ${reviewDate.getFullYear()}`
  }

}
