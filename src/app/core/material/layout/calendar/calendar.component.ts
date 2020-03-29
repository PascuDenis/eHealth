import { Component, OnInit } from '@angular/core';
import { View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public data: object[] = [{
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2020, 3, 7, 10, 0),
    EndTime: new Date(2018, 7, 3, 12, 30)
  }];
  public eventSettings: EventSettingsModel = {
    dataSource: this.data
  }


  constructor() { }

  ngOnInit(): void {
  }

}
