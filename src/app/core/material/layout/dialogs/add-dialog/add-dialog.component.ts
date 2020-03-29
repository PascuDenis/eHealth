import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "src/app/model/DialogData";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-dialog",
  templateUrl: "./add-dialog.component.html",
  styleUrls: ["./add-dialog.component.css"]
})
export class AddDialogComponent {
  dialogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.createForm();
    console.log(this.data);
  }

  createForm() {
    this.dialogForm = this.fb.group({
      name: ["", Validators.required],
      date: ["", Validators.required]
    });
  }

  save() {
    this.dialogRef.close(this.dialogForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
