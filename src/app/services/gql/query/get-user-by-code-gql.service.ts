import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GetUserByCodeServiceGql extends Query<any>{
  document = gql`
    query getUserByCode($code:String){
      userByCode(code:$code) {
        id,
        accountName,
        profile{
          displayName,
          customURL,
          profilePictureUrl
        }
      }
    }
  `;
}
