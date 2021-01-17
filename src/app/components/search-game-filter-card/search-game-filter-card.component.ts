import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-game-filter-card',
  templateUrl: './search-game-filter-card.component.html',
  styleUrls: ['./search-game-filter-card.component.scss']
})
export class SearchGameFilterCardComponent implements OnInit {

  @Input() headerTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
