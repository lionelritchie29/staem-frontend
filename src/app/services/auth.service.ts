import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserAccount } from '../models/user-account';
import { GetUserByIdGqlService } from './gql/get-user-by-id-gql.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  KEY: string = "token";
  _loggedUser: UserAccount;

  constructor() { }

  storeToken(token: string) {
    localStorage.setItem(this.KEY, token)
  }

  getLoggedInUserId(): Observable<any> {
    const token = localStorage.getItem(this.KEY)

    if (token === undefined || token === null) {
      console.log("No user");
      return null;
    }else {
      const encodedPayload = token.split('.')[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload);

      return payload.userId;
    }
  }

  logout() {
    localStorage.removeItem(this.KEY)
  }
}
