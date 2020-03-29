import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { HttpClientModule } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

import { AppComponent } from "./app.component";
import { DrugsComponent } from "./components/drugs/drugs.component";
import { InterractionsComponent } from "./components/interractions/interractions.component";
import { SideEffectsComponent } from "./components/side-effects/side-effects.component";
import { InMemoryDrugService } from "./core/services/in-memory-drug.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RouterModule, Routes, Router } from "@angular/router";
import { UserService } from "./core/services/user.service";
import { MaterialModule } from "./core/material/material.module";
import { HomeComponent } from "./core/material/layout/home/home.component";
import { LoginLayoutComponent } from "./core/material/layout/login-layout/login.component";
import { appRoutes } from "./app-routing.module";
import { SpecialistComponent } from "./components/specialist/specialist.component";
import { ForgottenPasswordComponent } from "./components/forgotten-password/forgotten-password.component";
import { AuthService } from "./core/authentication/auth.service";
import { UserResolver } from "./components/user/user.resolve";
import { AuthGuard } from "./core/authentication/auth.guard";
import { LoginComponent } from "./components/login/login.component";
import { UserComponent } from "./components/user/user.component";
import { EditProfileComponent } from "./core/material/layout/edit-profile/edit-profile.component";
import { ListSpecialistsComponent } from "./core/material/layout/list-specialists/list-specialists.component";
import { SpecialistDetailsComponent } from "./core/material/layout/specialist-details/specialist-details.component";
import { DatePipe } from '@angular/common';

// import { HttpModule, Http } from "@angular/http";
// import { NgxWebstorageModule } from "ngx-webstorage";

@NgModule({
  declarations: [
    AppComponent,
    DrugsComponent,
    InterractionsComponent,
    SideEffectsComponent,
    LoginComponent,
    UserComponent,
    ForgottenPasswordComponent,
    HomeComponent,
    EditProfileComponent,
    ListSpecialistsComponent,
    SpecialistDetailsComponent,
    LoginLayoutComponent,
    SpecialistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, { useHash: false }),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDrugService, {
      dataEncapsulation: false
    }),
    // NgxWebstorageModule.forRoot(),
    // HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
