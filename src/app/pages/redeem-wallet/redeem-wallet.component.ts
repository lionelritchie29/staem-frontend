import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { GetUserByIdGqlService } from 'src/app/services/gql/get-user-by-id-gql.service';
import { RedeemWalletGqlService } from 'src/app/services/gql/mutation/redeem-wallet-gql.service';

@Component({
  selector: 'app-redeem-wallet',
  templateUrl: './redeem-wallet.component.html',
  styleUrls: ['./redeem-wallet.component.scss'],
})
export class RedeemWalletComponent implements OnInit {
  currentUser: UserAccount;
  isError: boolean = false;
  errorMsg: string = '';

  redeemWalletForm: FormGroup = this.fb.group({
    code: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private getUserByIdGqlService: GetUserByIdGqlService,
    private redeemWalletGqlService: RedeemWalletGqlService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    if (userId !== null) {
      this.getUserByIdGqlService
        .watch({ id: userId })
        .valueChanges.subscribe((res) => (this.currentUser = res.data.user));
    }
  }

  onRedeem() {
    if (!this.currentUser) {
      this.isError = true;
      this.errorMsg = 'You must login first.';
    } else if (this.redeemWalletForm.get('code').value === '') {
      this.isError = true;
      this.errorMsg = 'You must enter a wallet code to proceed.';
    } else {
      this.redeem();
    }
  }

  redeem() {
    this.redeemWalletGqlService
      .mutate({
        userId: this.currentUser.id,
        code: this.redeemWalletForm.get('code').value,
      })
      .pipe(map((res) => (<any>res.data).redeemWallet))
      .subscribe((wallet) => {
        if (wallet) {
          this.isError = false;
          this.errorMsg = '';
          alert(`Redeem Rp. ${(<any>wallet).amount} success!`);
          this.redeemWalletForm.setValue({ code: '' });
          window.location.reload();
        } else {
          this.isError = true;
          this.errorMsg = 'Code does not valid or exists';
        }
      });
  }
}
