import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AllReceivedFriendRequestByIdGqlService extends Query<any>{
  document = gql`
    query getFriendRequest($id:Int){
      friendRequestByUserId(id:$id) {
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
