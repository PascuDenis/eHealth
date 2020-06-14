import { Component, OnInit } from "@angular/core";
import { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { MatDialog } from "@angular/material/dialog";
import { TreatmentDialogComponent } from "../dialogs/treatment-dialog/treatment-dialog.component";
import { EventDialogComponent } from "../dialogs/event-dialog/event-dialog.component";
import { Appointment } from "src/app/model/Appointmnet";
import { Event } from "src/app/model/Event";
import { AppointmentService } from "src/app/core/services/appointment.service";
import { AuthService } from "src/app/core/authentication/auth.service";
import * as moment from "moment";
import { GeneralDialogComponent } from "../dialogs/general-dialog/general-dialog.component";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
})
export class CalendarComponent implements OnInit {
  appointment: Appointment;

  event: Event;
  calendarEvents = [];
  calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];

  constructor(
    public service: AppointmentService,
    public auth: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  handleDateClick(arg) {
    let clickedDate = moment(new Date(arg.dateStr)).format("H:mm a");

    let dialogRef = this.dialog.open(EventDialogComponent, {
      panelClass: "dialog",
      width: "400px",
      data: {
        startTime: clickedDate,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      let year = arg.dateStr.toString().split("-")[0];
      let month = arg.dateStr.toString().split("-")[1] - 1;
      let day = arg.dateStr.toString().split("-")[2];

      console.log(result.startTime);
      console.log(result.endTime);
      console.log(arg.dateStr);

      let startDate = moment(
        new Date(year, month, day, result.startTime.toString().split(" ")[0])
      ).format("YYYY/MM/DD H:mm a");

      let endDate = moment(
        new Date(year, month, day, result.endTime.toString().split(" ")[0])
      ).format("YYYY/MM/DD H:mm a");

      let newEvent = new Event(
        result.title,
        startDate.toString(),
        endDate.toString(),
        result.description
      );
      this.appointment = new Appointment(
        null,
        this.auth.getAuth().currentUser.uid,
        null,
        newEvent
      );

      this.service.save(this.appointment);
      console.log("The dialog was closed");
    });
  }

  loadAppointments() {
    let id = this.auth.getAuth().currentUser.uid;
    this.service.getAllAppointmentsForSpecialist(id).subscribe((result) => {
      const list = [];
      result.forEach((res) => {
        console.log(res.id);

        list.push({
          id: res.id,
          title: res.event.title,
          start: new Date(res.event.startDate),
          end: new Date(res.event.endDate),
          description: res.event.description,
          color: res.event.color,
        });
      });
      console.log(list);
      this.calendarEvents = list;
    });
  }

  eventClick(args) {
    const eventId = args.event.id;
    let dialogRef = this.dialog.open(GeneralDialogComponent, {
      panelClass: "dialog",
      width: "400px",
      data: { data: "Do you want to delete this event?" },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.service.removeEvent(this.auth.getAuth().currentUser.uid, eventId);
      }
    });
  }

  addEvent() {
    // this.calendarEvents = this.calendarEvents.concat({
    //   // creates a new array!
    //   title: "event 2",
    //   date: "2019-04-02",
    // });
  }
}
