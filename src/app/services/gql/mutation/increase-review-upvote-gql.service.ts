import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class IncreaseReviewUpvoteGqlService extends Mutation {
  document = gql`
    mutation increaseUpvoteCount($id: Int) {
      increseReviewUpvote(reviewId: $id)
    }
  `;
}
