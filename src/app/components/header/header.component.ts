import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { Article, ArticleWithoutId } from "../../models/article.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  constructor(private dialog: MatDialog, private articlesService: ArticlesService) {}

  private sub!: Subscription;

  @Output() increaseArticle = new EventEmitter<Article[]>();

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent);

    this.sub = articleDialogComponent.afterClosed()
      .pipe(
        switchMap((article: ArticleWithoutId) => this.articlesService.addArticles(article))
      )
      .subscribe((articles: Article[]) => this.increaseArticle.emit(articles));
  };

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

}
