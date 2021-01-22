import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetCommentsByUserIdGqlService extends Query<any>{
  document = gql`
    query getCommentsByUserId($id:Int) {
      commentsByUserId(id:$id) {
        srcUser{
          id,
          profile{
            displayName,
            profilePictureUrl,
            customURL

          }
        }
        destUser{
          id,
          profile{
            displayName,
            profilePictureUrl,
            customURL
          }
        }
        content,
        createdAt
      }
    }
  `;
}
