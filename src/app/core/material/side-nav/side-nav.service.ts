import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private specialistProfilePictureStorageUrl = 'specialist-profile-image';

  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  hideSideNav: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private auth: AuthService
  ) { }


  public toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }


  public getPhotoUrlForUserId(): string {
    this.storage.ref(this.specialistProfilePictureStorageUrl).child(this.auth.getAuth().currentUser.uid);
    return '';
  }

}
