import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { ArticleWithoutId } from "../../models/article.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  constructor(private dialog: MatDialog, private articlesService: ArticlesService) {}

  private sub!: Subscription;

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent);

    this.sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((article: ArticleWithoutId) => !!article),
        switchMap((article: ArticleWithoutId) => this.articlesService.addArticles(article))
      ).subscribe();
  };

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }
}
