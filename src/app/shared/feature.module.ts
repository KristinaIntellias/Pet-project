import { NgModule } from '@angular/core';

import { SharedModule } from './shared.module';
import { ArticleComponent } from '../components/article/article.component';
import { SideBarComponent } from '../components/side-bar/side-bar.component';
import { ArticleDialogComponent } from '../components/article-dialog/article-dialog.component';

@NgModule({
  declarations: [
    ArticleComponent,
    SideBarComponent,
    ArticleDialogComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ArticleComponent,
    SideBarComponent,
    ArticleDialogComponent
  ]
})
export class FeatureModule { }
