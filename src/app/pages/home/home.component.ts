import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gameCategories: string[] = ["New and Trending", "Top Sellers", "Specials"];

  constructor() { }

  ngOnInit(): void {
  }

}
