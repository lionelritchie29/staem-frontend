import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { GetUserByCodeServiceGql } from 'src/app/services/gql/query/get-user-by-code-gql.service';
import { Apollo, gql } from 'apollo-angular'
import { Router } from '@angular/router';

const CREATE_FRIEND_REQUEST = gql`
  mutation createFriendRequest($from:Int, $to:Int) {
    createFriendRequest(fromId:$from, toId:$to)
  }
`;

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss']
})
export class AddFriendComponent implements OnInit {

  inputCode: string = '';
  searchedUser: UserAccount;
  currentUserCode: string;

  constructor(
    private getUserByCodeServiceGql: GetUserByCodeServiceGql,
    private getUserByIdGqlService: GetUserByIdGqlService,
    private authService: AuthService,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();
    this.getUserByIdGqlService
      .watch({id: userId})
      .valueChanges
      .pipe(map(res => res.data.user.code))
      .subscribe(code => this.currentUserCode = code);
  }

  onChange() {
    this.getUserByCodeServiceGql
      .watch({code: this.inputCode})
      .valueChanges
      .pipe(map(res => res.data.userByCode))
      .subscribe(fetchedUser => {
        if(fetchedUser.id != 0) {
          this.searchedUser = fetchedUser;
        }else {
          this.searchedUser = null;
        }
      });
  }

  addFriend(toId: number): void {
    const fromId = this.authService.getLoggedInUserId();

    if (fromId != null) {
      this.apollo.mutate({
        mutation: CREATE_FRIEND_REQUEST,
        variables: {from: fromId, to: toId}
      })
      .pipe(map(res => (<any>res.data).createFriendRequest))
      .subscribe(isSuccess => {
        if (isSuccess) {
          this.inputCode = '';
          this.searchedUser = null;
          alert('Add friend success!');
        } else {
          alert('Oops, an error occured when adding this friend\nor you have already sent friend request for this user.');
        }
      })
    }
  }

}
