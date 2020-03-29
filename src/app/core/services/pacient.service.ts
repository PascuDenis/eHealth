import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { IPactients } from "src/app/model/iPacients";
import { Observable } from "rxjs";
import { Pacients } from "src/app/model/Pacients";
import * as firebase from "firebase";
import { ItemTypes } from "src/app/model/ItemTypes";
import { Items } from "src/app/model/Items";
import { Treatments } from "src/app/model/Treatments";

@Injectable({
  providedIn: "root"
})
export class PacientService {
  private pacientUrl = "pacients/";
  private pacientProfilePictureStorageUrl = "pacient-profile-image/";

  pacients$: Observable<IPactients[]>;

  constructor(private database: AngularFireDatabase) {}

  getAllPacients(): Observable<IPactients[]> {
    return this.database.list<IPactients>(this.pacientUrl).valueChanges();
  }

  getPacientById(id: string): Observable<IPactients> {
    return this.database
      .object<IPactients>(this.pacientUrl + id)
      .valueChanges();
  }

  getPacientsItems(id: string, item: string): Observable<Items[]> {
    return this.database
      .list<Items>(this.pacientUrl + id + "/" + item)
      .valueChanges();
  }

  getPacientsTreatments(id: string): Observable<Treatments[]> {
    return this.database
      .list<Treatments>(this.pacientUrl + id + "/Treatments")
      .valueChanges();
  }

  savePacientItem(id: string, item: Items) {
    console.log("_______________---");
    console.log(item);
    const promise = firebase
      .database()
      .ref("pacients/" + id + "/" + item.type)
      .push(item);
    firebase
      .database()
      .ref("pacients/" + id + "/" + item.type + "/" + promise.key)
      .update({ id: promise.key });
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }

  savePacientTreatment(id: string, treatment: Treatments) {
    console.log(treatment);
    const promise = firebase
      .database()
      .ref("pacients/" + id + "/Treatments")
      .push(treatment);
    firebase
      .database()
      .ref("pacients/" + id + "/Treatments/" + promise.key)
      .update({ id: promise.key });
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }

  removePacientItem(id: string, itemName: string, itemId: string) {
    const promise = firebase
      .database()
      .ref("pacients/" + id + "/" + itemName + "/" + itemId)
      .remove();
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }

  removePacientTreatment(id: string, treatmentId: string) {
    const promise = firebase
      .database()
      .ref("pacients/" + id + "/Treatments/" + treatmentId)
      .remove();
    promise
      .then(_ => console.log("success"))
      .catch(err => console.log(err, "Error"));
  }
  //TODO
  //modifyPacientItem(item:Items){}

  // saveMockData() {
  //   let pacient01: Pacients = { id: "123456", name: "lastName01", username: "username01", email: "da@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient02: Pacients = { id: "234567", name: "lastName02", username: "username01", email: "db@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient03: Pacients = { id: "345678", name: "lastName03", username: "username01", email: "dc@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient04: Pacients = { id: "456789", name: "lastName04", username: "username01", email: "dd@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient05: Pacients = { id: "567890", name: "lastName05", username: "username01", email: "de@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient07: Pacients = { id: "111111", name: "lastName06", username: "username01", email: "df@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient08: Pacients = { id: "222222", name: "lastName07", username: "username01", email: "dg@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient09: Pacients = { id: "333333", name: "lastName08", username: "username01", email: "dh@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};
  //   let pacient10: Pacients = { id: "444444", name: "lastName09", username: "username01", email: "di@gmail.com", telephoneNumber: 12345, streetAddress: "Address 01", city: "city 01", state: "state 01", profilePicturePath: "http://i.pravatar.cc/300", isOnline: false, age: 20, weight: 60, height: 170};

  //   let pacients: { pacient: Pacients }[] = [
  //     { "pacient": pacient01 },
  //     { "pacient": pacient02 },
  //     { "pacient": pacient03 },
  //     { "pacient": pacient04 },
  //     { "pacient": pacient05 },
  //     { "pacient": pacient07 },
  //     { "pacient": pacient08 },
  //     { "pacient": pacient09 },
  //     { "pacient": pacient10 }
  //   ]

  //   pacients.forEach(function (value) {
  //     const promise = firebase.database().ref('pacients/' + value.pacient.id).set(value.pacient);
  //     promise
  //       .then(_ => console.log('success'))
  //       .catch(err => console.log(err, 'Error'));
  //   });
  // }
}
