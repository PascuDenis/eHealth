import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef
} from "@angular/core";
import { PacientService } from "src/app/core/services/pacient.service";
import { ActivatedRoute } from "@angular/router";
import { Pacients } from "src/app/model/Pacients";
import * as moment from "moment";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Items } from "src/app/model/Items";
import { ItemTypes } from "src/app/model/ItemTypes";
import { AddDialogComponent } from "../dialogs/add-dialog/add-dialog.component";
import { GeneralDialogComponent } from "../dialogs/general-dialog/general-dialog.component";
import { TreatmentDialogComponent } from "../dialogs/treatment-dialog/treatment-dialog.component";
import { stringify } from "querystring";
import { AuthService } from "src/app/core/authentication/auth.service";
import { Treatments } from "src/app/model/Treatments";

@Component({
  selector: "app-pacient-details",
  templateUrl: "./pacient-details.component.html",
  styleUrls: ["./pacient-details.component.css"]
})
export class PacientDetailsComponent implements OnInit {
  details = "none";
  pacient: Pacients;
  problems: Items[] = [];
  allergies: Items[] = [];
  observations: Items[] = [];
  treatments: Treatments[] = [];

  age = 21;
  birthdate;

  startPage: number;
  paginationLimitProblems: number;
  paginationLimitAllergies: number;
  paginationLimitObservations: number;
  paginationLimitTreatments: number;
  list: any;

  @ViewChild("div") private div: ElementRef;

  name: string;
  date: string;

  constructor(
    private pacientService: PacientService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.startPage = 0;
    this.paginationLimitProblems = 5;
    this.paginationLimitAllergies = 5;
    this.paginationLimitObservations = 5;
    this.paginationLimitTreatments = 5;
  }

  ngOnInit(): void {
    this.pacientService
      .getPacientById(this.route.snapshot.params.id)
      .subscribe(res => {
        this.pacient = res;
        console.log(this.pacient);
      });

    this.loadProblems();
    this.loadAllergies();
    this.loadObservations();
    this.loadTreatments();

    this.birthdate = moment()
      .subtract(this.age, "years")
      .format("YYYY");
  }

  loadProblems() {
    this.pacientService
      .getPacientsItems(
        this.route.snapshot.params.id,
        ItemTypes[ItemTypes.Problems]
      )
      .subscribe(res => {
        this.problems = res;
        console.log(res);
      });
  }

  loadAllergies() {
    this.pacientService
      .getPacientsItems(
        this.route.snapshot.params.id,
        ItemTypes[ItemTypes.Allergies]
      )
      .subscribe(res => {
        this.allergies = res;
        console.log(res);
      });
  }

  loadObservations() {
    this.pacientService
      .getPacientsItems(
        this.route.snapshot.params.id,
        ItemTypes[ItemTypes.Observations]
      )
      .subscribe(res => {
        this.observations = res;
        console.log(res);
      });
  }

  loadTreatments() {
    this.pacientService
      .getPacientsTreatments(this.route.snapshot.params.id)
      .subscribe(res => {
        this.treatments = res;
        console.log(res);
      });
  }

  addTreatment() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(TreatmentDialogComponent, {
      panelClass: "dialog",
      data: { specialistId: this.authService.afAuth.auth.currentUser.uid },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != 'exit') {
        this.pacientService.savePacientTreatment(this.pacient.id, result);
      }
      console.log("The dialog was closed");
    });
  }

  addItems(itemName: string, itemNameShow: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: "400px",
      data: { name: this.name, date: this.date, itemName: itemNameShow }
    });

    dialogRef.afterClosed().subscribe(result => {
      const momentDate = new Date(result.date);
      const formattedDate = moment(momentDate).format("YYYY/MM/DD");
      let item = new Items(
        null,
        result.name,
        formattedDate,
        ItemTypes[itemName]
      );
      console.log(item);
      this.pacientService.savePacientItem(this.pacient.id, item);
      console.log("The dialog was closed");
    });
  }

  deleteItems(itemName: string, id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: "400px",
      data: { data: "Are you sure you want to delete this " + itemName + "?" }
    });

    console.log(id);
    console.log(itemName);
    console.log(ItemTypes[itemName]);
    console.log(this.pacient.id);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.pacientService.removePacientItem(this.pacient.id, itemName, id);
      }
    });
  }

  deleteTreatment(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: "400px",
      data: { data: "Are you sure you want to delete this treatment?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.pacientService.removePacientTreatment(this.pacient.id, id);
      }
    });
  }

  modifyItem(item: Items) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: "400px",
      data: {
        id: item.id,
        name: item.name,
        date: item.date,
        itemName: item.type
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  showMoreItems(paginationLimit: string) {
    switch (paginationLimit) {
      case "Allergy": {
        this.paginationLimitAllergies =
          Number(this.paginationLimitAllergies) + 10;
        break;
      }
      case "Observation": {
        this.paginationLimitObservations =
          Number(this.paginationLimitObservations) + 10;
        break;
      }
      case "Problem": {
        this.paginationLimitProblems =
          Number(this.paginationLimitProblems) + 10;
        break;
      }
      case "Treatment": {
        this.paginationLimitTreatments =
          Number(this.paginationLimitTreatments) + 10;
        break;
      }
    }
  }
  showLessItems(paginationLimit: string) {
    switch (paginationLimit) {
      case "Allergy": {
        this.paginationLimitAllergies =
          Number(this.paginationLimitAllergies) - 10;
        break;
      }
      case "Observation": {
        this.paginationLimitObservations =
          Number(this.paginationLimitObservations) - 10;
        break;
      }
      case "Problem": {
        this.paginationLimitProblems =
          Number(this.paginationLimitProblems) - 10;
        break;
      }
      case "Treatment": {
        this.paginationLimitTreatments =
          Number(this.paginationLimitTreatments) - 10;
        break;
      }
    }
  }
}
