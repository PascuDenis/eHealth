import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { AuthService } from "../../authentication/auth.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SideNavService } from "./side-nav.service";
import { SpecialistService } from "../../services/specialist.service";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeneralDialogComponent } from '../layout/dialogs/general-dialog/general-dialog.component';

@Component({
  selector: "app-side-nav",
  templateUrl: "./side-nav.component.html",
  styleUrls: ["./side-nav.component.css"]
})
export class SideNavComponent implements OnInit {
  isMenuOpen = true;
  contentMargin = 240;
  name = "";

  profileImage: File = null;
  profilePictureUrl = null;

  @ViewChild("sidenav") public sidenav: MatSidenav;

  constructor(
    public authService: AuthService,
    public navSideService: SideNavService,
    private specialistService: SpecialistService,
    private router: Router,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  onToolbarMenuToggle() {
    console.log("On toolbar toggled", this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem("currentUserId"));
    this.loadCurrentUserData();
  }

  loadCurrentUserData() {
    console.log("got here");
    let currentUserId = localStorage.getItem("currentUserId");
    console.log(currentUserId);
    this.specialistService.getSpecialistById(currentUserId).subscribe(user => {
      console.log(user);
      this.name = user.name;
      this.profilePictureUrl = user.profilePicturePath;
      console.log(this.profilePictureUrl + "alallla");
      if (this.profilePictureUrl == null) {
        this.profilePictureUrl =
          "https://firebasestorage.googleapis.com/v0/b/learnwithme-d7e6f.appspot.com/o/specialist-profile-image%2Fdefault-picture.png?alt=media&token=4fa0ad26-0b9a-4bff-a98d-96172e127f2a";
      }
    });
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: "400px",
      data: { data: "Are you sure you want to log out?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.authService.doLogout().then(
          res => {
            this.router.navigate(["/login"]);
          },
          error => {
            console.log("Logout error", error);
          }
        );
      }
    });
    // if (confirm("Are you sure you want to log out?")) {
    //   this.authService.doLogout().then(
    //     res => {
    //       this.router.navigate(["/login"]);
    //     },
    //     error => {
    //       console.log("Logout error", error);
    //     }
    //   );
    // }
  }
}
