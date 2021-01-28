import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { UserAccount } from 'src/app/models/user-account';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CreateNewGameTransactionGqlService } from 'src/app/services/gql/mutation/create-new-game-transaction-gql.service';

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.scss'],
})
export class SelfComponent implements OnInit {
  isFormOk: boolean = true;
  isWalletEnough: boolean = false;
  cartItems: Game[] = [];
  loggedUser: UserAccount;

  selfCheckoutForm = this.fb.group({
    recipientName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    cardNumber: ['', Validators.required],
    expDate: ['', Validators.required],
    country: ['Indonesia', Validators.required],
    paymentMethod: [1, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private createNewGameTransactionGqlService: CreateNewGameTransactionGqlService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user.walletAmount >= this.cartService.getSubTotal()) {
        this.isWalletEnough = true;
      }
    });
    this.cartItems = this.cartService.get();
  }

  onSubmit(): void {
    if (this.selfCheckoutForm.status === 'INVALID') {
      this.isFormOk = false;
    } else {
      this.isFormOk = true;
      this.isWalletEnough = true;
    }
  }

  createTransaction(): void {
    const details: any[] = this.createDetails();

    this.createNewGameTransactionGqlService
      .mutate({
        newTransaction: {
          billingAddress: this.selfCheckoutForm.get('address').value,
          billingCity: this.selfCheckoutForm.get('city').value,
          cardExp: this.selfCheckoutForm.get('expDate').value,
          cardNo: this.selfCheckoutForm.get('cardNumber').value,
          country: this.selfCheckoutForm.get('country').value,
          paymentMethod: this.selfCheckoutForm.get('paymentMethod').value,
          phoneNumber: this.selfCheckoutForm.get('phoneNumber').value,
          postalCode: this.selfCheckoutForm.get('postalCode').value,
          user: this.authService.getLoggedInUserId(),
          details: details,
        },
      })
      .pipe(map((res) => (<any>res.data).createNewSelfTransaction))
      .subscribe((isSuccess) => {
        if (isSuccess) {
          alert('Transaction success!');
          this.router.navigate(['/']);
          this.cartService.clear();
        } else {
          alert('Transaction failed :(');
        }
      });
  }

  createDetails(): any[] {
    const details: any[] = [];
    this.cartItems.forEach((cart) => {
      details.push({
        game: cart.id,
        price: ((100 - cart.sale.discount) / 100) * cart.price,
        quantity: 1,
      });
    });

    return details;
  }

  onTransactionAccepted() {
    this.createTransaction();
  }
}
