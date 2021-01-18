import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  
  searchTerm: string = '';
  cartLength: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.cartLength = this.cartService.get().length;
  }

  onSearchButtonClicked(): void {
    this.router.navigate(['search'], {queryParams: {term: this.searchTerm}});
    this.searchTerm = '';
  }

}
