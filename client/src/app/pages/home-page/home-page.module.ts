import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";

import { SharedModule } from '../../shared/shared.module';
import { HomePageComponent } from "./home-page.component";
import { ArticleListComponent } from '../../components/article-list/article-list.component';
import { ArticleComponent } from '../../components/article/article.component';
import { ArticleDialogComponent } from '../../components/article-dialog/article-dialog.component';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ArticleListComponent,
    ArticleComponent,
    ArticleDialogComponent,
    SideBarComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: HomePageComponent }]),
  ],
  exports: [
    RouterModule
  ]
})
export class HomePageModule {}
