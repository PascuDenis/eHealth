import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { LayoutModule } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatBadgeModule } from "@angular/material/badge";
import { SideNavComponent } from "./side-nav/side-nav.component";
import { LayoutComponent } from "./layout/layout.component";
import { SideNavService } from "./side-nav/side-nav.service";
import { TogglerComponent } from "./side-nav/toggler/toggler.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { appRoutes } from "src/app/app-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatDividerModule } from "@angular/material/divider";
import { AppointmentsComponent } from "./layout/appointments/appointments.component";
import { CalendarComponent } from "./layout/calendar/calendar.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import {
  ScheduleModule,
  RecurrenceEditorModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthAgendaService,
  MonthService
} from "@syncfusion/ej2-angular-schedule";
import { PacientsComponent } from "./layout/pacients/pacients.component";
import { PacientDetailsComponent } from "./layout/pacient-details/pacient-details.component";
import { MatNativeDateModule } from "@angular/material/core";
import { AddDialogComponent } from "./layout/dialogs/add-dialog/add-dialog.component";
import { GeneralDialogComponent } from "./layout/dialogs/general-dialog/general-dialog.component";
import { TreatmentDialogComponent } from "./layout/dialogs/treatment-dialog/treatment-dialog.component";

const materials = [
  LayoutModule,
  MatButtonModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,

  ReactiveFormsModule,
  FormsModule,

  ScheduleModule,
  RecurrenceEditorModule
];

@NgModule({
  declarations: [
    SideNavComponent,
    LayoutComponent,
    TogglerComponent,
    AppointmentsComponent,
    CalendarComponent,
    DashboardComponent,
    PacientsComponent,
    PacientDetailsComponent,
    AddDialogComponent,
    GeneralDialogComponent,
    TreatmentDialogComponent
  ],
  imports: [materials, CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [materials, SideNavComponent, LayoutComponent, CommonModule],
  providers: [
    SideNavService,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService
  ]
})
export class MaterialModule {}
