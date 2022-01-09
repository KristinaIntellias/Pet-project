import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription, throwError } from "rxjs";
import { filter, switchMap, catchError, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  public articles!: Article[];
  private user!: User;
  private sub = new Subscription();

  ngOnInit(): void {
    this.getUser();
    this.getArticles();
    this.getArticleUpdateListener();
  }

  toggleFavorite(article: Article): void {
    article.usersLikeId.includes(this.user._id) ?
      article.usersLikeId = article.usersLikeId.filter((id) => id !== this.user._id) :
      article.usersLikeId = [...article.usersLikeId, this.user._id];
    const sub = this.articlesService.updateArticle(article)
      .subscribe((newArticle: Article) =>
        this.articles = this.articles.map((article: Article) =>
          article._id !== newArticle._id ? article : {...newArticle, isOwner: this.user._id === newArticle.author._id}
        )
      );

    this.sub.add(sub);
  }

  editArticle(article: Article): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: article });

    const sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((updatedArticle: Article) => !!updatedArticle),
        switchMap((updatedArticle: Article) => this.articlesService.updateArticle(updatedArticle)),
        tap((updatedArticle: Article) => {
          this.articles = this.articles.map((article: Article) =>
            article._id === updatedArticle._id ? {...updatedArticle, isOwner: true} : article);
        }),
        catchError(this.errorHandler)
      )
      .subscribe();

    this.sub.add(sub);
  }

  deleteArticle(article: Article): void {
    const sub = this.articlesService.deleteArticle(article)
      .subscribe(() => this.articles = this.articles.filter((elem: Article) => elem._id !== article._id));

    this.sub.add(sub);
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  private getUser(): void {
    const sub = this.userService.getUser().subscribe((user: User) => this.user = user);

    this.sub.add(sub);
  }

  private getArticles(): void {
    const sub = this.articlesService.getArticles()
      .subscribe((articles: Article[]) =>
        this.articles = articles.map((article: Article) => {
          return {...article, isOwner: this.user._id === article.author._id};
        })
      );

    this.sub.add(sub);
  }

  private getArticleUpdateListener(): void {
    const sub = this.articlesService.getArticleUpdateListener()
      .subscribe((articles: Article[]) => this.articles = articles);

    this.sub.add(sub);
  }

  private errorHandler({ error }: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
}
