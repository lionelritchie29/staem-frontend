
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { LoginGqlService } from 'src/app/services/gql/query/login-gql.service';

const CREATE_UNSUSPEND_REQUEST  = gql`
  mutation createUnsuspendRequest($id: Int, $reason: String) {
    createUnsuspendRequest(userId:$id,reason:$reason)
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  accountName: string = '';
  password: string = '';
  isError: boolean = false;
  errorMsg: string = '';

  constructor(
    private loginGqlService: LoginGqlService,
    private getUserByIdGqlService: GetUserByIdGqlService,
    private authService:  AuthService,
    private router: Router,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    if(this.authService.getLoggedInUserId() !== null) {
      this.router.navigate(['/']);
    }
  }

  login(e: Event) {
    e.preventDefault();

    if(this.accountName === '' || this.password === '') {
      this.isError = true;
      this.errorMsg = 'All field must be filled.'
      return;
    }
    
    this.loginGqlService
      .watch({accountName: this.accountName, pass: this.password})
      .valueChanges
      .subscribe(res => {
        this.afterLogin(res.data.login);
      });
  }

  afterLogin(token: string) {
    if (token === null) {
      this.isError = true;
      this.errorMsg = 'Wrong account name or password';
    } else {
      const userId = this.authService.parseTokenToUserId(token);
      this.checkIfUserSuspended(userId, token);
    }
  }

  checkIfUserSuspended(userId: number, token: string) {
    this.getUserByIdGqlService
    .watch({id: userId})
    .valueChanges
    .pipe(map(res => res.data.user))
    .subscribe(user => {
      if (user.suspendedAt != null) {
        this.handleUnsuspendForm(userId);
      } else {
        this.authService.storeToken(token);
        this.router.navigate(['/'])
          .then(() => window.location.reload());
      }
    })
  }

  handleUnsuspendForm(userId: number) {
    if( confirm('You are suspended, please fill the form to unsuspend your account') ) {
      const reason = prompt('Input reason: ');
      this.apollo.mutate({
        mutation: CREATE_UNSUSPEND_REQUEST,
        variables: {id: userId, reason}
      }).pipe(map(res => (<any>res.data).createUnsuspendRequest))
      .subscribe(isSuccess => {
        if(isSuccess) {
          alert("Request created! Please wait for admin to review your request.");
        } else {
          alert("Oops. You already created a request before.");
        }
      })
    } 
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

}
