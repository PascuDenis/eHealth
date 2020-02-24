import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { UserComponent } from './core/authentication/user/user.component';
import { UserResolver } from './core/authentication/user/user.resolve';
import { ForgottenPasswordComponent } from './core/authentication/forgotten-password/forgotten-password.component';
import { NgModule } from '@angular/core';
import { FirstComponent } from './core/material/side-nav/first/first.component';
import { SecondComponent } from './core/material/side-nav/second/second.component';
import { LoginLayoutComponent } from './core/material/layout/login-layout/login.component';
import { HomeComponent } from './core/material/layout/home/home.component';
import { LayoutComponent } from './core/material/layout/layout.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  // { path: 'forgottenPassword', component: ForgottenPasswordComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, resolve: { data: UserResolver } },
  { path: 'first', component: FirstComponent},
  { path: 'second', component: SecondComponent },

];
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {
    path: 'login', component: LoginLayoutComponent, data: {title: 'First Component'},
    children: [
      {path: '', component: LoginComponent}
    ]
  },
  { path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'first', pathMatch: 'full' },
      { path: 'first', component: FirstComponent },
      { path: 'second', component: SecondComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }