import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from "./pages/error-page/error-page.component";
import { AuthGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./pages/sign-up-page/sign-up-page.module').then(
        (m) => m.SignUpPageModule
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./pages/sign-in-page/sign-in-page.module').then(
        (m) => m.SignInPageModule
      ),
  },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo: '/error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
