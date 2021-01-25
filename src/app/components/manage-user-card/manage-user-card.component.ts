import { Component, Input, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getUserImageUrl } from 'src/app/globals';
import { UserAccount } from 'src/app/models/user-account';
import { UserReport } from 'src/app/models/user-report';
import { GetReportsByUserIdGqlService } from 'src/app/services/gql/query/get-reports-by-user-id-gql.service';

const SUSPEND_USER = gql`
  mutation suspendUser($id:Int) {
    suspendUser(userId:$id)
  }
`;

const UNSUSPEND_USER = gql`
  mutation unsuspendUser($id:Int) {
    unsuspendUser(userId:$id)
  }
`;

@Component({
  selector: 'app-manage-user-card',
  templateUrl: './manage-user-card.component.html',
  styleUrls: ['./manage-user-card.component.scss']
})
export class ManageUserCardComponent implements OnInit {

  @Input() user: UserAccount;
  reports: UserReport[] = [];
  profileImgUrl: string = '';
  showDetail: boolean = false;

  constructor(
    private getReportsByUserIdGqlService: GetReportsByUserIdGqlService,
    private apollo: Apollo,
  ) { }

  ngOnInit(): void {
    this.profileImgUrl = getUserImageUrl(this.user.profile.profilePictureUrl);

    this.getReportsByUserIdGqlService
      .watch({id: this.user.id})
      .valueChanges
      .pipe(map(res => res.data.reportsByUserId))
      .subscribe(reports => {
        this.reports = reports;
      });
  }

  onMouseEnter() {
    this.showDetail = true;
  }

  onMouseLeave() {
    this.showDetail = false;
  }

  onSuspend() {
    this.apollo.mutate({
      mutation: SUSPEND_USER,
      variables: {id: this.user.id},
    }).pipe(map(res => (<any>res.data).suspendUser))
    .subscribe(isSuccess => {
      if (isSuccess) {
        alert('User suspended');
        window.location.reload();
      } else {
        alert('Oops. Error when suspending this user.')
      }
    })
  }

  onUnsuspend() {
    this.apollo.mutate({
      mutation: UNSUSPEND_USER,
      variables: {id: this.user.id},
    }).pipe(map(res => (<any>res.data).unsuspendUser))
    .subscribe(isSuccess => {
      if (isSuccess) {
        alert('User unsuspended');
        window.location.reload();
      } else {
        alert('Oops. Error when unsuspending this user.')
      }
    })
  }

}
