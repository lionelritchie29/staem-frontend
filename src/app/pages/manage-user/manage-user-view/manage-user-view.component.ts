import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { UserAccount } from 'src/app/models/user-account';
import { UserReport } from 'src/app/models/user-report';
import { AllUsersGqlService } from 'src/app/services/gql/query/all-users-gql.service';

const GET_USERS_LIMIT_OFFSET = gql`
  query getUserLimitOffset($limit: Int, $offset: Int) {
    usersLimitOffset(limit: $limit, offset: $offset) {
      users {
        id
        accountName
        code
        email
        status
        suspendedAt
        walletAmount
        role {
          id
          name
        }
        profile {
          avatarFrameUrl
          country
          customURL
          displayName
          featuredBadgeUrl
          level
          miniProfileBackgroundUrl
          point
          profileBackgroundUrl
          profilePictureUrl
          realName
          summary
          theme
        }
      }
      totalCount
    }
  }
`;

@Component({
  selector: 'app-manage-user-view',
  templateUrl: './manage-user-view.component.html',
  styleUrls: ['./manage-user-view.component.scss'],
})
export class ManageUserViewComponent implements OnInit {
  users: UserAccount[] = [];
  reports: UserReport[] = [];

  limit: number = 5;
  offset: number = 0;
  page: number = 1;
  totalPage: number = 1;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apollo
      .watchQuery({
        query: GET_USERS_LIMIT_OFFSET,
        variables: { limit: this.limit, offset: this.offset },
      })
      .valueChanges.subscribe((res) => {
        this.users = (<any>res.data).usersLimitOffset.users;
        this.totalPage = Math.ceil(
          (<any>res.data).usersLimitOffset.totalCount / this.limit
        );
      });
  }

  onNext() {
    if (this.page == this.totalPage) return;

    this.page += 1;
    this.offset = (this.page - 1) * this.limit;
    this.fetchUsers();
  }

  onPrev() {
    if (this.page == 1) return;

    this.page -= 1;
    this.offset = (this.page - 1) * this.limit;
    this.fetchUsers();
  }
}
