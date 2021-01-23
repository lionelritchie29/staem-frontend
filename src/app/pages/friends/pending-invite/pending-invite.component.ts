import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FriendRequest } from 'src/app/models/friend-request';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { AllReceivedFriendRequestByIdGqlService } from 'src/app/services/gql/query/all-received-friend-request-by-id-gql.service';
import { AllSentFriendRequestByIdGqlService } from 'src/app/services/gql/query/all-sent-friend-request-by-id-gql.service';

@Component({
  selector: 'app-pending-invite',
  templateUrl: './pending-invite.component.html',
  styleUrls: ['./pending-invite.component.scss']
})
export class PendingInviteComponent implements OnInit {

  receivedFriendRequest: FriendRequest[]  = [];
  sentFriendRequest: FriendRequest[]  = [];

  constructor(
    private authService: AuthService,
    private allReceivedFriendRequestByIdGqlService: AllReceivedFriendRequestByIdGqlService,
    private allSentFriendRequestByIdGqlService: AllSentFriendRequestByIdGqlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authService.getLoggedInUserId() === null) {
      this.router.navigate(['/']);
    }
    
    this.getReceived();
  }

  getReceived(): void {
    const userId = this.authService.getLoggedInUserId();
    
    if (userId) {
      this.allReceivedFriendRequestByIdGqlService
        .watch({id: userId})
        .valueChanges
        .pipe(map(res => res.data.friendRequestByUserId))
        .subscribe(received => this.receivedFriendRequest = received);

      this.allSentFriendRequestByIdGqlService
        .watch({id: userId})
        .valueChanges
        .pipe(map(res => res.data.sentFriendRequestById))
        .subscribe(sent => this.sentFriendRequest = sent);
    }
  }

}
