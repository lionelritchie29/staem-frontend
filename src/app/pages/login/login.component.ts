
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginGqlService } from 'src/app/services/gql/query/login-gql.service';

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
    private authService:  AuthService,
    private router: Router
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
      this.authService.storeToken(token);
      this.router.navigate(['/'])
        .then(() => window.location.reload());
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

}
