import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UserAccount } from '../models/user-account';
import { GetUserByIdGqlService } from './gql/get-user-by-id-gql.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LOGOUT_MUTATION = gql`
  mutation logout($id: Int) {
    logout(id: $id)
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  KEY: string = 'token';
  _loggedUser: UserAccount;

  constructor(
    private apollo: Apollo,
    private getUserByIdGqlService: GetUserByIdGqlService
  ) {}

  storeToken(token: string) {
    localStorage.setItem(this.KEY, token);
  }

  parseTokenToUserId(token: string): number {
    const encodedPayload = token.split('.')[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);

    return payload.userId;
  }

  getLoggedInUserId(): number {
    const token = localStorage.getItem(this.KEY);

    if (token === undefined || token === null) {
      return null;
    } else {
      const encodedPayload = token.split('.')[1];
      const decodedPayload = atob(encodedPayload);
      const payload = JSON.parse(decodedPayload);

      return payload.userId;
    }
  }

  getUser(): Observable<any> {
    const userId = this.getLoggedInUserId();

    return this.getUserByIdGqlService
      .watch({ id: userId })
      .valueChanges.pipe(map((res) => res.data.user));
  }

  logout() {
    this.apollo
      .mutate({
        mutation: LOGOUT_MUTATION,
        variables: { id: this.getLoggedInUserId() },
      })
      .subscribe();
    localStorage.removeItem(this.KEY);
  }
}
