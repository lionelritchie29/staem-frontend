import { Injectable } from '@angular/core';
import { gql, Mutation } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class IncreaseReviewDownvoteGqlService extends Mutation {
  document = gql`
    mutation increaseDownvoteCount($id: Int) {
      increseReviewDownvote(reviewId: $id)
    }
  `;
}
