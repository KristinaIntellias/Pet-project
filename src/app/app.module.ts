import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AngularSvgIconModule } from 'angular-svg-icon';

import { SharedModule } from './shared/shared.module';
import { FeatureModule } from './shared/feature.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    ArticleListComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FeatureModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
