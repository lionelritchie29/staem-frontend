import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class RecentlyPostedGameReviewsGqlService extends Query<any> {
  document = gql`
    query recentlyPostedReviewById($id: Int) {
      recentlyPostedReviewByGameId(gameId: $id) {
        id
        content
        upvoteCount
        downvoteCount
        isRecommended
        gameId
        reviewDateTime
        user {
          id
          accountName
          profile {
            profilePictureUrl
          }
        }
      }
    }
  `;
}
