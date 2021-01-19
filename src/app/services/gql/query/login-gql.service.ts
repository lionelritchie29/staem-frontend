import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGqlService extends Query<any>{
  document = gql`
    query login($accountName:String, $pass:String) {
      login(accountName:$accountName, password: $pass)
    }
  `;
}
