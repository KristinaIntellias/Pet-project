import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { SharedModule } from '../../shared/shared.module';
import { SignInPageComponent } from "./sign-in-page.component";

@NgModule({
  declarations: [
    SignInPageComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: SignInPageComponent }]),
  ],
  exports: [
    RouterModule,
  ]
})
export class SignInPageModule {}
