import { Component, Input, OnInit } from '@angular/core';
import { GameSystemRequirement } from 'src/app/models/game-system-requirement';

@Component({
  selector: 'app-system-req',
  templateUrl: './system-req.component.html',
  styleUrls: ['./system-req.component.scss']
})
export class SystemReqComponent implements OnInit {
  @Input() req: GameSystemRequirement;

  constructor() { }

  ngOnInit(): void {
  }

}
