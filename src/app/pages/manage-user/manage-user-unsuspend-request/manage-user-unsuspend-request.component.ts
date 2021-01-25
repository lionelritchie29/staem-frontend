import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UnsuspendRequest } from 'src/app/models/unsuspend-request';

const GET_ALL_UNSUSPEND_REQUESTS = gql`
  query getAllUnsuspendRequest{
    unsuspendRequests{
      user{
        id,
        accountName,
        profile{
          displayName,
          profilePictureUrl
        }
      },
      reason,
      status,
      createdAt
    }
  }
` 

@Component({
  selector: 'app-manage-user-unsuspend-request',
  templateUrl: './manage-user-unsuspend-request.component.html',
  styleUrls: ['./manage-user-unsuspend-request.component.scss']
})
export class ManageUserUnsuspendRequestComponent implements OnInit {

  requests: UnsuspendRequest[] = [];

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_ALL_UNSUSPEND_REQUESTS,
    })
    .valueChanges
    .subscribe(res => this.requests = (<any>res.data).unsuspendRequests);
  }

}
