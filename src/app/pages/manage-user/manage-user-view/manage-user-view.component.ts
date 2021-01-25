import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'src/app/models/user-account';
import { UserReport } from 'src/app/models/user-report';
import { AllUsersGqlService } from 'src/app/services/gql/query/all-users-gql.service';

@Component({
  selector: 'app-manage-user-view',
  templateUrl: './manage-user-view.component.html',
  styleUrls: ['./manage-user-view.component.scss']
})
export class ManageUserViewComponent implements OnInit {

  users: UserAccount[] = [];
  reports: UserReport[] = [];

  constructor(
    private allUsersGqlService: AllUsersGqlService,
  ) { }

  ngOnInit(): void {
    this.allUsersGqlService.watch()
    .valueChanges
    .subscribe(res => {
      this.users = res.data.users;
    })
  }

}
