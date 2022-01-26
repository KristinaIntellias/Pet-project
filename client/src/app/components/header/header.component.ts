import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { NavigationEnd, Router } from "@angular/router";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { RoutingEnum } from "../../models/routing.model";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    public router: Router,
    private dialog: MatDialog,
    private articlesService: ArticlesService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  public route!: string;
  public routing = RoutingEnum;
  public user!: User;
  private sub = new Subscription();

  ngOnInit(): void {
    this.getRoute();
  }

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent, { data: {author: this.user} });
    const sub = articleDialogComponent.afterClosed()
      .pipe(
        filter((article: Article) => !!article),
        switchMap((article: Article) => this.articlesService.addArticle(article)),
        switchMap(() => this.articlesService.getArticles()),
        switchMap((articles: Article[]) => this.articlesService.normalizeArticles(articles, this.user._id)),
        catchError(this.errorHandler)
      )
      .subscribe((articles: Article[]) => this.articlesService.articlesUpdated$.next([...articles]));

    this.sub.add(sub);
  };

  logout(): void {
    this.authService.logOut();
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  private errorHandler({ error }: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  private getRoute(): void {
    const sub = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(event => event.url)
      )
      .subscribe((url: string) => {
        this.route = url
        this.getUser();
      });

    this.sub.add(sub);
  }

  private getUser(): void {
    const sub = this.userService.getUser().subscribe((user: User | null) => {
      if (!!user) {
        this.user = user
      }
    });

    this.sub.add(sub);
  }
}
