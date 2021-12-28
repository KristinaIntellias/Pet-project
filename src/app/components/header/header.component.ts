import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, filter, switchMap, tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
import { LikesService } from "../../services/likes.service";
import { Like } from "../../models/like.model";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private articlesService: ArticlesService,
    private likesService: LikesService,
    private userService: UserService,
  ) {}

  private likes!: Like[];
  private sub = new Subscription();
  private user!: User;

  ngOnInit(): void {
    this.getLikes();
    this.getUser();
  }

  openArticleDialog(): void {
    let newArticle: Article;
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: {} });
    const sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((article: Article) => !!article),
        tap((article: Article) => newArticle = article),
        switchMap(() => this.likesService.addLike(String(newArticle._id))),
        switchMap((like: Like) => {
          this.likes = [...this.likes, like];
          return this.articlesService.addArticle({...newArticle, likeId: like._id})
        }),
        switchMap(() => this.articlesService.getArticles()),
        catchError(this.errorHandler)
      )
      .subscribe((articles: Article[]) => {
        articles = articles.map((article: Article) => {
          const like: Like = this.likes.find((elem: Like) => elem._id === article.likeId) || {};
          return this.user._id === article.userId ?
            {...article, isOwner: true, like: like} : {...article, isOwner: false, like: like};
        });
        this.articlesService.articlesUpdated$.next([...articles]);
      });

    this.sub.add(sub);
  };

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  private errorHandler({ error }: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  private getUser(): void {
    const sub = this.userService.getUser().subscribe((user: User) => this.user = user);

    this.sub.add(sub);
  }
  private getLikes(): void {
    const sub = this.likesService.getLikes().subscribe((likes: Like[]) => this.likes = likes);

    this.sub.add(sub);
  }

}
