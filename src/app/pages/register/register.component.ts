import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CreateNewUserGqlService } from 'src/app/services/gql/mutation/create-new-user-gql.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
    recaptcha: [null, Validators.required]
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.getLoggedInUserId() !== null) {
      this.router.navigate(['/']);
    }
  }

  onContinue() {
    if (this.stepOneForm.status === "INVALID"){
      this.isError = true;
      this.errorMsg = "All field must be filled (include RECAPTCHA)";
    } else if (this.stepOneForm.get('email').value != this.stepOneForm.get('confirmEmail').value) {
      this.isError = true;
      this.errorMsg = "Email does not match";
    } else{
      this.isError = false;
      this.isSecondStep = true;
    }
  }

  onBack() {
    this.isSecondStep = false;
  }

  onRegister() {
    if (this.stepTwoForm.status === "INVALID"){
      this.isError = true;
      this.errorMsg = "All field must be filled";
    } else if(this.stepTwoForm.get('password').value != this.stepTwoForm.get('confirmPassword').value) {
      this.isError = true;
      this.errorMsg = "Password does not match";
    } else {
      this.isError = false;
      this.createUser();
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  createUser() {
    const accountName = this.stepTwoForm.get('accountName').value;
    const password = this.stepTwoForm.get('password').value;
    const email = this.stepOneForm.get('email').value;
    const country = this.stepOneForm.get('country').value;

    this.createNewUserGqlService.mutate({
      "newUser": {
        "accountName": accountName,
        "email": email,
        "password": password,
        "country": country,
      },
    })
    .pipe(map(res => (<any>res.data).createNewUser))
    .subscribe(isSuccess => {
      if(isSuccess) {
        alert('Register success!');
        this.router.navigate(['/login']);
      }else {
        alert('Oops.. Something is wrong when registering...');
      }
    });
  }

}
