import { Routes } from '@angular/router';

import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './core/authentication/login/login.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { UserComponent } from './core/authentication/user/user.component';
import { UserResolver } from './core/authentication/user/user.resolve';
import { ForgottenPasswordComponent } from './core/authentication/forgotten-password/forgotten-password.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'forgottenPassword', component: ForgottenPasswordComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent,  resolve: { data: UserResolver}},
];