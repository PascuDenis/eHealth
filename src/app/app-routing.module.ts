import { Routes, RouterModule } from "@angular/router";

import { NgModule } from "@angular/core";
import { LoginLayoutComponent } from "./core/material/layout/login-layout/login.component";
import { HomeComponent } from "./core/material/layout/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ForgottenPasswordComponent } from "./components/forgotten-password/forgotten-password.component";
import { UserComponent } from "./components/user/user.component";
import { UserResolver } from "./components/user/user.resolve";
import { AuthGuard } from "./core/authentication/auth.guard";
import { EditProfileComponent } from "./core/material/layout/edit-profile/edit-profile.component";
import { ListSpecialistsComponent } from "./core/material/layout/list-specialists/list-specialists.component";
import { SpecialistDetailsComponent } from "./core/material/layout/specialist-details/specialist-details.component";
import { DashboardComponent } from "./core/material/layout/dashboard/dashboard.component";
import { AppointmentsComponent } from "./core/material/layout/appointments/appointments.component";
import { CalendarComponent } from "./core/material/layout/calendar/calendar.component";
import { PacientsComponent } from "./core/material/layout/pacients/pacients.component";
import { PacientDetailsComponent } from './core/material/layout/pacient-details/pacient-details.component';

export const appRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    component: LoginLayoutComponent,
    data: { title: "First Component" },
    canActivate: [AuthGuard],
    children: [{ path: "", component: LoginComponent }]
  },
  {
    path: "forgottenPassword",
    component: ForgottenPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      { path: "appointments", component: AppointmentsComponent },
      { path: "calendar", component: CalendarComponent },
      {
        path: "list-specialists",
        component: ListSpecialistsComponent,
        children: [
          {
            path: "specialist-details/:id",
            component: SpecialistDetailsComponent
          }
        ]
      },
      { path: "edit-profile", component: EditProfileComponent },
      {
        path: "pacients",
        component: PacientsComponent,
        children: [
          {
            path: "pacient-details/:id",
            component: PacientDetailsComponent
          }
        ]
      },
      {
        path: "user",
        component: UserComponent,
        resolve: { data: UserResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
