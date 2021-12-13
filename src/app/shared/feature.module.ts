import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';
import { ArticleListComponent } from '../components/article-list/article-list.component';
import { ArticleComponent } from '../components/article/article.component';
import { ArticleDialogComponent } from '../components/article-dialog/article-dialog.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleComponent,
    ArticleDialogComponent,
    SideBarComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ArticleListComponent,
    ArticleComponent,
    ArticleDialogComponent,
    SideBarComponent,
  ]
})
export class FeatureModule { }
