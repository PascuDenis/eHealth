import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-general-dialog",
  templateUrl: "./general-dialog.component.html",
  styleUrls: ["./general-dialog.component.css"]
})
export class GeneralDialogComponent implements OnInit {
  json: string;
  message: string;
  constructor(
    public dialogRef: MatDialogRef<GeneralDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.json);
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(false);
  }
}
