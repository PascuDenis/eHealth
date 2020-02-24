import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  hideSideNav: boolean = false;

  constructor() { }


  public toggleSideNav():void {
    this.hideSideNav = !this.hideSideNav;
  }

}
