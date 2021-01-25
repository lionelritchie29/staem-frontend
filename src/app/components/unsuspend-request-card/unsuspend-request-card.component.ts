import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { UnsuspendRequest } from 'src/app/models/unsuspend-request';

const UNSUSPEND_USER = gql`
  mutation unsuspendUser($id:Int) {
    unsuspendUser(userId:$id)
  }
`;

const DENY_UNSUSPEND_REQUEST = gql`
  mutation denyUnsuspendRequest($id: Int) {
    denyUnsuspendRequest(userId: $id)
  }
`;

@Component({
  selector: 'app-unsuspend-request-card',
  templateUrl: './unsuspend-request-card.component.html',
  styleUrls: ['./unsuspend-request-card.component.scss']
})
export class UnsuspendRequestCardComponent implements OnInit {

  @Input() request: UnsuspendRequest;
  profileImgurl: string = '';

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.profileImgurl = getUserImageUrl(this.request.user.profile.profilePictureUrl);
  }

  onAccept() {
    this.apollo.mutate({
      mutation: UNSUSPEND_USER,
      variables: {id: this.request.user.id},
    }).pipe(map(res => (<any>res.data).unsuspendUser))
    .subscribe(isSuccess => {
      if (isSuccess) {
        alert('User un-suspended');
        window.location.reload();
      } else {
        alert('Oops. Error when un-suspending this user.')
      }
    })
  }

  onDeny() {
    this.apollo.mutate({
      mutation: DENY_UNSUSPEND_REQUEST,
      variables: {id: this.request.user.id},
    }).pipe(map(res => (<any>res.data).denyUnsuspendRequest))
    .subscribe(isSuccess => {
      if (isSuccess) {
        alert('User request denied!');
        window.location.reload();
      } else {
        alert('Oops. Error when denying this request.')
      }
    })
  }

}
