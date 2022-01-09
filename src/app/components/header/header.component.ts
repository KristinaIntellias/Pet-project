import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, filter, switchMap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
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
    private userService: UserService,
  ) {}

  private sub = new Subscription();
  private user!: User;

  ngOnInit(): void {
    this.getUser();
  }

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: {author: this.user} });
    const sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((article: Article) => !!article),
        switchMap((article: Article) => this.articlesService.addArticle(article)),
        switchMap(() => this.articlesService.getArticles()),
        catchError(this.errorHandler)
      )
      .subscribe((articles: Article[]) => {
        articles = articles.map((article: Article) => {
            return {...article, isOwner: this.user._id === article.author._id}
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
    const sub = this.userService.user$.subscribe((user: User) => this.user = user);

    this.sub.add(sub);
  }
}
