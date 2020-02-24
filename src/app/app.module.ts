import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppComponent } from './app.component';
import { DrugsComponent } from './components/drugs/drugs.component';
import { InterractionsComponent } from './components/interractions/interractions.component';
import { SideEffectsComponent } from './components/side-effects/side-effects.component';
import { InMemoryDrugService } from './core/services/in-memory-drug.service';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { UserComponent } from './core/authentication/user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes, Router } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './core/authentication/user/user.resolve';
import { UserService } from './core/services/user.service';
import { AuthService } from './core/services/auth.service';
import { ForgottenPasswordComponent } from './core/authentication/forgotten-password/forgotten-password.component';
import { MaterialModule } from './core/material/material.module';
import { FirstComponent } from './core/material/side-nav/first/first.component';
import { SecondComponent } from './core/material/side-nav/second/second.component';
import { HomeComponent } from './core/material/layout/home/home.component';
import { LoginLayoutComponent } from './core/material/layout/login-layout/login.component';
import { appRoutes, rootRouterConfig } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    DrugsComponent,
    InterractionsComponent,
    SideEffectsComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ForgottenPasswordComponent, 
    FirstComponent,
    SecondComponent,
    HomeComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDrugService, { dataEncapsulation: false }
    ),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
