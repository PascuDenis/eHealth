import { Component, OnInit, Inject } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddDialogComponent } from "../add-dialog/add-dialog.component";
import { DialogTreatmentData } from "src/app/model/DialogTreatmentData";
import { Treatments } from "src/app/model/Treatments";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-treatment-dialog",
  templateUrl: "./treatment-dialog.component.html",
  styleUrls: ["./treatment-dialog.component.css"]
})
export class TreatmentDialogComponent {
  treatment: Treatments;

  dialogTreatmentForm = new FormGroup({
    specialistId: new FormControl(""),
    name: new FormControl(""),
    date: new FormControl(""),
    description: new FormControl("")
  });

  dialogDrugForm = new FormGroup({
    drug: new FormControl(""),
    adminidrugNamestrationTime: new FormControl(""),
    repeatAfterHours: new FormControl(""),
    cycle: new FormControl(""),
    dose: new FormControl("")
  });

  exampleForm: FormGroup;
  totalSum: number = 0;
  myFormValueChanges$;

  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogTreatmentData
  ) {
    this.createForm();
    console.log(this.data);
  }

  // private getCountryByIpOnline(): Observable<any> {
  //   return this.http
  //     .get("https://ipapi.co/json/")
  // }

  createForm() {
    this.dialogTreatmentForm = this.formBuilder.group({
      specialistId: [],
      name: ["", Validators.required],
      date: ["", Validators.required],
      description: [""],
      drugAdministrations: this.formBuilder.array([
        this.addDrugAdministrationFormGroup()
      ])
    });
  }

  addNewDrugButtonClick(): void {
    (<FormArray>this.dialogTreatmentForm.get("drugAdministrations")).push(
      this.addDrugAdministrationFormGroup()
    );
  }

  addDrugAdministrationFormGroup(): FormGroup {
    this.dialogDrugForm = this.formBuilder.group({
      drug: ["", Validators.required],
      administrationTime: ["", Validators.required],
      repeatAfterHours: ["", [Validators.min(1), Validators.max(12)]],
      cycle: ["", [Validators.min(1), Validators.max(30)]],
      dose: ["", [Validators.min(25), Validators.max(10000)]]
    });
    return this.dialogDrugForm;
  }

  deleteDrugAdministationFromGroup(drugAdministrationsIndex: number): void {
    (<FormArray>this.dialogTreatmentForm.get("drugAdministrations")).removeAt(
      drugAdministrationsIndex
    );
  }

  save() {
    var ddMMyyyy = this.datePipe.transform(
      this.dialogTreatmentForm.value.date,
      "dd/MM/yyyy"
    );
    this.treatment = new Treatments(
      null,
      this.dialogTreatmentForm.value.specialistId,
      this.dialogTreatmentForm.value.name,
      ddMMyyyy,
      this.dialogTreatmentForm.value.description,
      this.dialogTreatmentForm.value.drugAdministrations
    );
    console.log(this.treatment);
    this.dialogRef.close(this.treatment);
  }

  close(): void {
    this.dialogRef.close('exit');
  }
}
