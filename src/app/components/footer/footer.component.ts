import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  links = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Redeem Wallet',
      link: '/redeem-wallet',
    },
    {
      title: 'Games',
      link: '/search?term=',
    },
    {
      title: 'Cart',
      link: '/cart',
    },
    {
      title: 'Market',
      link: '/market',
    },
    {
      title: 'Inventory',
      link: '/inventory',
    },
    {
      title: 'Login',
      link: '/login',
    },
    {
      title: 'Register',
      link: '/register',
    },
    {
      title: 'Point Shop',
      link: '/points/shop',
    },
    {
      title: 'Wishlist',
      link: '/wishlist',
    },
    {
      title: 'My Profile',
      link: '/',
    },
    {
      title: 'My Friends',
      link: '/',
    },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getLoggedInUserId();

    if (userId !== null) {
      this.authService.getUser().subscribe((user) => {
        this.links[10].link = `/profile/${user.profile.customURL}`;
        this.links[11].link = `/profile/${user.profile.customURL}/friends`;
      });
    }
  }
}
