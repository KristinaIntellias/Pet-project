import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Article } from "../models/article.model";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService implements OnDestroy {
  constructor(private http: HttpClient, private userService: UserService) {}

  public articlesUpdated$ = new Subject<Article[]>();
  private sub = new Subscription();
  private url = 'http://localhost:3000/api/posts';
  private user!: User;

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  addArticle(article: Article): Observable<Article> {
    this.getUser();
    return this.http.post<Article>(this.url, {...article, userId: this.user._id});
  }

  updateArticle(article: Article): Observable<Article> {
    this.getUser();
    return this.http.put<Article>(this.url, {...article, userId: this.user._id});
  }

  increaseFavorite(article: Article): Observable<Article> {
    return this.http.put<Article>(this.url, {...article, favorite: article.favorite + 1});
  }

  getArticleUpdateListener() {
    return this.articlesUpdated$.asObservable();
  }

  getUser(): void {
    this.sub = this.userService.user$.subscribe((user: User) => this.user = user);
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }
}
