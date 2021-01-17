import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  
  searchTerm: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSearchButtonClicked(): void {
    this.router.navigate(['search'], {queryParams: {term: this.searchTerm}});
    this.searchTerm = '';
  }

}
