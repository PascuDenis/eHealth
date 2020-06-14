import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase";
import { Appointment } from "src/app/model/Appointmnet";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  appointmentUrl = "appointments/";
  events$: Observable<any[]>;

  constructor(private database: AngularFireDatabase) {}

  getAllAppointmentsForSpecialist(specialistId: string): Observable<any[]> {
    console.log(specialistId);

    this.events$ = this.database
      .list<Appointment>(this.appointmentUrl + specialistId + "/")
      .valueChanges();
    return this.events$;
  }

  save(appointment: Appointment) {
    var keyRef = firebase
      .database()
      .ref()
      .child(this.appointmentUrl)
      .child(appointment.specialistId)
      .push().key;
    appointment.id = keyRef;

    const promise = firebase
      .database()
      .ref()
      .child(this.appointmentUrl)
      .child(appointment.specialistId)
      .child(keyRef)
      .set(appointment);
    console.log(appointment);

    promise
      .then((_) => console.log("success"))
      .catch((err) => console.log(err, "Error"));
  }

  removeEvent(specialistId: string, eventId: string) {
    const path = this.appointmentUrl + specialistId + "/" + eventId;
    console.log(path);

    const promise = this.database
      .object(this.appointmentUrl + specialistId + "/" + eventId)
      .remove();
    promise
      .then((_) => console.log("success"))
      .catch((err) => console.log(err, "Error"));
  }
}
