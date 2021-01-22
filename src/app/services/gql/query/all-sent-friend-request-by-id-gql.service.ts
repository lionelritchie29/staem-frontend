import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllSentFriendRequestByIdGqlService extends Query<any>{
  document = gql`
    query getFriendRequest($id:Int){
      sentFriendRequestById(id:$id) {
        friend{
          id,
          accountName,
          profile {
            profilePictureUrl,
            displayName,
            level
          }
        },
        status,
        createdAt
      }
    }
  `;
}
