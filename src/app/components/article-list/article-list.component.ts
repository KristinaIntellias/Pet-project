import { Component, OnDestroy, OnInit } from '@angular/core';
import {catchError, Observable, Subscription, throwError} from "rxjs";
import { MatDialog } from "@angular/material/dialog";

import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { filter, switchMap } from "rxjs/operators";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  constructor(
    private articlesService: ArticlesService,
    private dialog: MatDialog
  ) {}

  public articles!: Article[];
  private sub = new Subscription();

  ngOnInit() {
    this.getArticles();
    this.getArticleUpdateListener();
  }

  articleEvent(article: Article): void {
    const sub = this.articlesService.increaseFavorite(article)
      .subscribe((data: Article) =>
        this.articles = this.articles.map((article: Article) =>
          data._id === article._id ? data : article));

    this.sub.add(sub);
  }

  openArticleDialog(article: Article): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: article });

    this.sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((article: Article) => !!article),
        switchMap((article: Article) => this.articlesService.updateArticle(article)),
        switchMap(() => this.articlesService.getArticles()),
        catchError(this.errorHandler)
      )
      .subscribe((articles: Article[]) =>
        this.articlesService.articlesUpdated$.next([...articles])
      );
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  private getArticles(): void {
    const sub = this.articlesService.getArticles()
      .subscribe((articles: Article[]) =>
        this.articles = articles
      );

    this.sub.add(sub);
  }

  private getArticleUpdateListener(): void {
    const sub = this.articlesService.getArticleUpdateListener()
      .subscribe((articles: Article[]) =>
        this.articles = articles
      );

    this.sub.add(sub);
  }

  private errorHandler({ error }: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
