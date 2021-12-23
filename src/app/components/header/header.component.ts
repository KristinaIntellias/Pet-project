import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import { filter, switchMap } from "rxjs/operators";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  constructor(
    private dialog: MatDialog,
    private articlesService: ArticlesService
  ) {}

  private sub!: Subscription;

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: {} });

    this.sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((article: Article) => !!article),
        switchMap((article: Article) => this.articlesService.addArticle(article)),
        switchMap(() => this.articlesService.getArticles()),
        catchError(this.errorHandler)
      )
      .subscribe((articles: Article[]) =>
        this.articlesService.articlesUpdated$.next([...articles])
      );
  };

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  private errorHandler({ error }: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
