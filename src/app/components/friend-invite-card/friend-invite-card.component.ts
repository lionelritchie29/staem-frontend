import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { FriendRequest } from 'src/app/models/friend-request';
import { AuthService } from 'src/app/services/auth.service';


const ACCEPT_MUTATION = gql`
  mutation acceptFriendRequest($from:Int, $to:Int){
    acceptFriendRequest(fromId:$from, toId:$to) 
  }
`;

const REJECT_MUTATION = gql`
  mutation rejectFriendRequest($from:Int, $to:Int){
    rejectFriendRequest(fromId:$from, toId:$to) 
  }
`;

const IGNORE_MUTATION = gql`
  mutation ignoreFriendRequest($from:Int, $to:Int){
    ignoreFriendRequest(fromId:$from, toId:$to) 
  }
`;

@Component({
  selector: 'app-friend-invite-card',
  templateUrl: './friend-invite-card.component.html',
  styleUrls: ['./friend-invite-card.component.scss']
})
export class FriendInviteCardComponent implements OnInit {

  @Input() request: FriendRequest;
  @Input() isReceivedRequest: boolean;
  profileImgUrl: string;
  loggedUserId: number;

  constructor(
    private apollo: Apollo,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.request.friend.profile.profilePictureUrl);
    this.loggedUserId = this.authService.getLoggedInUserId();
  }

  onAccept(): void {
    this.apollo.mutate({
      mutation: ACCEPT_MUTATION,
      variables: {
        from: this.loggedUserId,
        to: this.request.friend.id
      }
    }).pipe(map(res => (<any>res.data).acceptFriendRequest))
    .subscribe(isSuccess => {
      if(isSuccess) {
        alert('Friend Accepted');
        window.location.reload();
      }else {
        alert('Accepting friend failed...')
      }
    });
  }

  onReject(): void {
    this.apollo.mutate({
      mutation: REJECT_MUTATION,
      variables: {
        from: this.loggedUserId,
        to: this.request.friend.id
      }
    }).pipe(map(res => (<any>res.data).rejectFriendRequest))
    .subscribe(isSuccess => {
      if(isSuccess) {
        alert('Friend Rejected');
        window.location.reload();
      }else {
        alert('Rejecting friend failed...')
      }
    });
  }

  onIgnore(): void {
    this.apollo.mutate({
      mutation: IGNORE_MUTATION,
      variables: {
        from: this.loggedUserId,
        to: this.request.friend.id
      }
    }).pipe(map(res => (<any>res.data).ignoreFriendRequest))
    .subscribe(isSuccess => {
      if(isSuccess) {
        alert('Friend Ignored');
        window.location.reload();
      }else {
        alert('Ignoring friend failed...')
      }
    });
  }


}
