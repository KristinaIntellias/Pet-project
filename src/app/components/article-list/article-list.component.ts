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
import { LikesService } from "../../services/likes.service";
import { Like } from "../../models/like.model";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private likesService: LikesService,
    private dialog: MatDialog
  ) {}

  public articles!: Article[];
  private likes!: Like[];
  private user!: User;
  private sub = new Subscription();

  ngOnInit(): void {
    this.getUser();
    this.getArticles();
    this.getArticleUpdateListener();
  }

  toggleFavorite(like: Like): void {
    const sub = this.likesService.toggleFavorite(like, String(this.user._id))
      .subscribe((data: Like) => {
        const { articleId } = like;
        this.articles = this.articles.map((article: Article) =>
          article._id !== like.articleId ? article : {...article, like: {...data, articleId}}
        )
      });

    this.sub.add(sub);
  }

  editArticle(article: Article): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: article });

    const sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((updatedArticle: Article) => !!updatedArticle),
        switchMap((updatedArticle: Article) => this.articlesService.updateArticle(updatedArticle)),
        tap((updatedArticle: Article) => {
          this.articles = this.articles.map((elem: Article) =>
            elem._id === updatedArticle._id ? {...updatedArticle, isOwner: true, like: article.like} : elem);
        }),
        catchError(this.errorHandler)
      )
      .subscribe();

    this.sub.add(sub);
  }

  deleteArticle(article: Article): void {
    const sub = this.likesService.deleteLike(String(article.likeId))
      .pipe(
        switchMap(() => this.articlesService.deleteArticle(article))
      )
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
    const sub = this.likesService.getLikes()
      .pipe(
        switchMap((likes: Like[]) => {
          this.likes = likes;
          return this.articlesService.getArticles()
        })
      )
      .subscribe((articles: Article[]) =>
        this.articles = articles.map((article: Article) => {
          const like: Like = this.likes.find((elem: Like) => elem._id === article.likeId) || {};
          return this.user._id === article.userId ?
            {...article, isOwner: true, like: like} : {...article, isOwner: false, like: like};
        }));

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
