import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class EditProfileService {
  private specializationUrl = "specializations/";

  constructor(private database: AngularFireDatabase) {}

  getSpecialisations(): Observable<any[]> {
    return this.database.list<any>(this.specializationUrl).valueChanges();
  }

  saveSpecialization(name: string) {
    {
    //   let list = [
    //   { name: "Cardiology" },
    //   { name: "Dermatology" },
    //   { name: "Endocrinology" },
    //   { name: "Gastroenterology" },

    //   { name: "Neurology" },
    //   { name: "Ophthalmology" },
    //   { name: "Pediatrics" },
    //   { name: "Psychiatry" },

    //   { name: "Radiology" },
    //   { name: "Rheumatology" },
    //   { name: "Urology" },
    // ];
    // for (let entry of list) {
    //   firebase
    //     .database()
    //     .ref(this.specializationUrl + entry.name)
    //     .set(entry.name);
    // }
  }
    const promise = firebase
      .database()
      .ref(this.specializationUrl + name)
      .set(name);
    promise
      .then((_) => console.log("success"))
      .catch((err) => console.log(err, "Error"));
  }

  deleteSpecialization(name: string) {
    const promise = this.database
      .object(this.specializationUrl + name)
      .remove();
    promise
      .then((_) => console.log("success"))
      .catch((err) => console.log(err, "Error"));
  }
}
