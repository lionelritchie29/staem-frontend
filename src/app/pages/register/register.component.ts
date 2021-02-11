import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CreateNewUserGqlService } from 'src/app/services/gql/mutation/create-new-user-gql.service';

const SEND_OTP_CODE = gql`
  mutation createOTP($email: String, $accountName: String) {
    createOTP(email: $email, accountName: $accountName)
  }
`;

const VERIFY_OTP = gql`
  mutation verifyOTP($code: String) {
    verifyOTP(code: $code)
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isError: boolean = false;
  isSecondStep: boolean = false;
  errorMsg: string = '';

  stepOneForm = this.fb.group({
    email: ['', Validators.required],
    confirmEmail: ['', Validators.required],
    country: ['Indonesia', Validators.required],
    agreeTerm: [null, Validators.required],
    recaptcha: [null, Validators.required],
  });

  stepTwoForm = this.fb.group({
    accountName: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    otpCode: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private createNewUserGqlService: CreateNewUserGqlService,
    private router: Router,
    private authService: AuthService,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    if (this.authService.getLoggedInUserId() !== null) {
      this.router.navigate(['/']);
    }
  }

  onContinue() {
    if (this.stepOneForm.status === 'INVALID') {
      this.isError = true;
      this.errorMsg = 'All field must be filled (include RECAPTCHA)';
    } else if (
      this.stepOneForm.get('email').value !=
      this.stepOneForm.get('confirmEmail').value
    ) {
      this.isError = true;
      this.errorMsg = 'Email does not match';
    } else {
      this.isError = false;
      this.generateOTP();
    }
  }

  onBack() {
    this.isSecondStep = false;
  }

  onRegister() {
    if (this.stepTwoForm.status === 'INVALID') {
      this.isError = true;
      this.errorMsg = 'All field must be filled';
    } else if (
      this.stepTwoForm.get('password').value !=
      this.stepTwoForm.get('confirmPassword').value
    ) {
      this.isError = true;
      this.errorMsg = 'Password does not match';
    } else {
      this.isError = false;
      this.validateOTP(this.stepTwoForm.get('otpCode').value);
    }
  }

  generateOTP(): void {
    this.apollo
      .mutate({
        mutation: SEND_OTP_CODE,
        variables: {
          email: this.stepOneForm.get('email').value,
          accountName: 'Guest',
        },
      })
      .pipe(map((res) => (<any>res.data).createOTP))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.isSecondStep = true;
          alert('An OTP code has been send to your email');
        } else {
          alert('Generate OTP Code failed');
        }
      });
  }

  validateOTP(code: string) {
    this.apollo
      .mutate({
        mutation: VERIFY_OTP,
        variables: {
          code,
        },
      })
      .pipe(map((res) => (<any>res.data).verifyOTP))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.createUser();
        } else {
          alert('OTP Code does not match');
        }
      });
  }

  createUser() {
    const accountName = this.stepTwoForm.get('accountName').value;
    const password = this.stepTwoForm.get('password').value;
    const email = this.stepOneForm.get('email').value;
    const country = this.stepOneForm.get('country').value;

    this.createNewUserGqlService
      .mutate({
        newUser: {
          accountName: accountName,
          email: email,
          password: password,
          country: country,
        },
      })
      .pipe(map((res) => (<any>res.data).createNewUser))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Register success!');
          this.router.navigate(['/login']);
        } else {
          alert('Oops.. Something is wrong when registering...');
        }
      });
  }
}
