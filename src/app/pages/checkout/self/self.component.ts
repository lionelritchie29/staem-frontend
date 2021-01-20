import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { map } from 'rxjs/operators';
import { Game } from 'src/app/models/game';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CreateNewGameTransactionGqlService } from 'src/app/services/gql/mutation/create-new-game-transaction-gql.service';

@Component({
  selector: 'app-self',
  templateUrl: './self.component.html',
  styleUrls: ['./self.component.scss']
})
export class SelfComponent implements OnInit {

  isFormOk: boolean = true;
  isWalletEnough: boolean = false;
  cartItems: Game[] = [];

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
  })

  constructor(
    private fb: FormBuilder,
    private createNewGameTransactionGqlService: CreateNewGameTransactionGqlService,
    private cartService: CartService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.get();
  }

  onSubmit(): void {
    if (this.selfCheckoutForm.status === "INVALID") {
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
        "newTransaction": {
          "billingAddress": this.selfCheckoutForm.get('address').value,
          "billingCity": this.selfCheckoutForm.get('city').value,
          "cardExp": this.selfCheckoutForm.get('expDate').value,
          "cardNo": this.selfCheckoutForm.get('cardNumber').value,
          "country": this.selfCheckoutForm.get('country').value,
          "paymentMethod": this.selfCheckoutForm.get('paymentMethod').value,
          "phoneNumber": this.selfCheckoutForm.get('phoneNumber').value,
          "postalCode": this.selfCheckoutForm.get('postalCode').value,
          "user": this.authService.getLoggedInUserId(),
          "details": details,
        }
      })
      .pipe(map(res => (<any>res.data).createNewSelfTransaction))
      .subscribe(isSuccess => console.log(isSuccess));
  }

  createDetails(): any[] {
    const details: any[] = [];
    this.cartItems.forEach((cart) => {
      details.push({
        "game": cart.id,
        "price": cart.price,
        "quantity": 1
      });
    });

    return details;
  }

}
