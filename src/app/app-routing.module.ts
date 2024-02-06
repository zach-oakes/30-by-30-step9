import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginScreenComponent} from "./login-screen/login-screen.component";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {authorizationGuard} from "./authorization.guard";
import {CreateAccountComponent} from "./create-account/create-account.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginScreenComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authorizationGuard] },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
