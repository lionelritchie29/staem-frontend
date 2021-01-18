import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HelpfulGameReviewsGqlService extends Query<any> {
  
  document = gql`
  query pastMonthReviewById($id:Int){
    mostHelpfulReviewByGameId(gameId:$id){
      id,
      gameId,
      title,
      content,
      upvoteCount,
      downvoteCount,
      isRecommended,
      reviewDateTime,
      user{
        id,
        accountName,
        profile{
          profilePictureUrl
        }
      }
    }
  }
  `
}
