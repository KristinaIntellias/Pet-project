import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent,
  ],
  imports: [
    NoopAnimationsModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
