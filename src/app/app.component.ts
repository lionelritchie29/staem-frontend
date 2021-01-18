import { Component, OnInit } from '@angular/core';
import { RemoveCartModalService } from './services/remove-cart-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  isModalOpen: boolean = false;
  
  constructor(
    public removeCartModalService: RemoveCartModalService
  ) {
    removeCartModalService.isOpen$.subscribe(res => this.isModalOpen = res)
  } 
}
