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

  sub = new Subscription();

  @Output() increaseArticle = new EventEmitter<Article[]>();

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent);

    const sub = articleDialogComponent.afterClosed()
      .pipe(
        switchMap((article: ArticleWithoutId) => this.articlesService.addArticles(article))
      )
      .subscribe((articles: Article[]) => this.increaseArticle.emit(articles));

    this.sub.add(sub);
  };

  ngOnDestroy (): void {
    this.sub.unsubscribe();
  }

}
