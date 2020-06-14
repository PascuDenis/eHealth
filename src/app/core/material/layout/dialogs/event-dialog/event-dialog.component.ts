import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/add-dialog.component";
import { DialogData } from "src/app/model/DialogData";
import { DialogEvent } from "src/app/model/DialogEvent";
import { GeneralDialogComponent } from "../general-dialog/general-dialog.component";

@Component({
  selector: "app-event-dialog",
  templateUrl: "./event-dialog.component.html",
  styleUrls: ["./event-dialog.component.css"],
})
export class EventDialogComponent {
  dialogForm: FormGroup;
  HOURS = [
    "6 am",
    "7 am",
    "8 am",
    "9 am",
    "10 am",
    "11 am",
    "12 am",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
    "10 pm",
    "11 pm",
    "12 pm",
  ];
  selectedStartTime: string;
  selectedEndTime: string;
  clickedTime: string;

  constructor(
    private fb: FormBuilder,
    public eventDialogRef: MatDialogRef<EventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogEvent
  ) {
    this.createForm();
    // this.clickedTime =
    //   data.startTime.split(":")[0] + " " + data.startTime.split(" ")[1];
    // console.log(this.clickedTime);
  }

  createForm() {
    this.dialogForm = this.fb.group({
      title: ["", Validators.required],
      startTime: ["", Validators.required],
      endTime: ["", Validators.required],
      description: ["", Validators.required],
    });
  }

  save() {
    this.eventDialogRef.close(this.dialogForm.value);
  }

  close(): void {
    this.eventDialogRef.close();
  }
}
