import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { LoginGqlService } from 'src/app/services/gql/query/login-gql.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginGqlService: LoginGqlService,
    private authService: AuthService,
    private getUserByIdGqlService: GetUserByIdGqlService,
    private router: Router
  ) {}

  errorMsg: string = '';

  adminLoginForm = this.fb.group({
    accountName: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}

  adminLogin() {
    if (this.adminLoginForm.status === 'INVALID') {
      this.errorMsg = 'All field must be filled';
      return;
    }

    console.log(this.adminLoginForm);
    const accountName = this.adminLoginForm.get('accountName').value;
    const password = this.adminLoginForm.get('password').value;

    this.loginGqlService
      .watch({ accountName: accountName, pass: password })
      .valueChanges.subscribe((res) => {
        console.log(res);
        this.afterLogin(res.data.login);
      });
  }

  afterLogin(token): void {
    if (token === null) {
      this.errorMsg = 'Wrong account name or password';
    } else {
      const userId = this.authService.parseTokenToUserId(token);
      this.checkRole(userId, token);
    }
  }

  checkRole(userId: number, token: string): void {
    this.getUserByIdGqlService
      .watch({ id: userId })
      .valueChanges.pipe(map((res) => res.data.user))
      .subscribe((user) => {
        console.log(user);
        if (user.role.id == 1 || user.role.id == 5) {
          alert('User must not login from there');
        } else {
          this.authService.storeToken(token);
          this.router.navigate(['/admin/manage-game']);
        }
      });
  }
}
