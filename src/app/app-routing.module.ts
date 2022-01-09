import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorPageComponent } from "./pages/error-page/error-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
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
