import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { AllSpecialOffersGqlService } from 'src/app/services/gql/query/all-special-offers-gql.service';
import { map } from 'rxjs/operators'
import { GameSale } from 'src/app/models/game-sale';

@Component({
  selector: 'app-special-offers',
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.scss']
})
export class SpecialOffersComponent implements OnInit {

  gamesOnSale: Game[] = []
  gameSales: GameSale[] = []
  rightArrowClickCount: number = 1;
  leftArrowClickCount: number = 1;

  constructor(private allSpecialOfferGqlService: AllSpecialOffersGqlService) { }

  ngOnInit(): void {
    this.allSpecialOfferGqlService.watch()
    .valueChanges
    .pipe(map(res => res.data))
    .subscribe(res => {
      this.gamesOnSale = res.gamesOnSale;
      this.gameSales = res.gameSales;
      // console.log(this.gamesOnSale)
      // console.log(this.gameSales)
    })
  }

  OnArrowRightClick(): void {
    if(this.rightArrowClickCount != this.gameSales.length - 2) {
      const itemContainer: HTMLElement = document.querySelector(".card-container-outer-inner");
      const itemWidth: number = document.querySelector('app-special-offers-card').clientWidth;
      itemContainer.style.marginLeft = `-${this.rightArrowClickCount * itemWidth}px`;
      this.rightArrowClickCount++;
      this.leftArrowClickCount--;
    }
  }

  OnArrowLeftClick(): void {
    if(this.leftArrowClickCount != 1) {
      const itemContainer: HTMLElement = document.querySelector(".card-container-outer-inner");
      const itemWidth: number = document.querySelector('app-special-offers-card').clientWidth;
      itemContainer.style.marginLeft = `${this.leftArrowClickCount * itemWidth}px`;
      this.leftArrowClickCount++;
      this.rightArrowClickCount--;
    }
  }

}
