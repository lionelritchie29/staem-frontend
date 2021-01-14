import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  links = [
    {
      name : 'Gift Cards',
      contents: [
        { title: 'Now Available on Steam'},
      ],
    },
    {
      name : 'Recommended',
      contents: [
        { title: 'By Friends'},
        { title: 'By Curator'},
        { title: 'Tags'},
      ],
    },
    {
      name : 'Discovery Queues',
      contents: [
        { title: 'Recommendations'},
        { title: 'New Release'},
      ],
    },
    {
      name : 'Browse Categories',
      contents: [
        { title: 'Top Sellers'},
        { title: 'New Releases'},
        { title: 'Upcoming'},
        { title: 'Specials'},
      ],
    },
    {
      name : 'Browse by Genre',
      contents: [
        { title: 'Free to Play'},
        { title: 'Early Access'},
        { title: 'Action'},
        { title: 'Adventure'},
        { title: 'Casual'},
        { title: 'Indie'},
        { title: 'Massively Multiplayer'},
        { title: 'Racing'},
        { title: 'RPG'},
        { title: 'Simulation'},
        { title: 'Sports'},
        { title: 'Stragey'},
      ],
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
