import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-toggler',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.css']
})
export class TogglerComponent implements OnInit {

  constructor(public sideNavService: SideNavService) { }

  ngOnInit(): void {
  }

}
