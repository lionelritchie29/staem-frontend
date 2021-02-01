import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  titles: string[] = ['Image and Videos', 'Reviews', 'Discussions'];

  constructor() {}

  ngOnInit(): void {}
}
