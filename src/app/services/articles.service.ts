import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

import { Article } from "../models/article.model";
import { UserService } from "./user.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public articlesUpdated$ = new Subject<Article[]>();
  private url = 'http://localhost:3000/api/posts';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  addArticle(article: Article): Observable<Article> {
    return this.userService.getUser().pipe(
      switchMap((user: User) =>  this.http.post<Article>(this.url, {...article, userId: user._id}))
      );
  }

  updateArticle(article: Article): Observable<Article> {
    return this.userService.getUser().pipe(
      switchMap((user: User) => this.http.put<Article>(this.url, {...article, userId: user._id}))
    )
  }

  deleteArticle({ _id }: Article): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/${_id}`);
  }

  getArticleUpdateListener() {
    return this.articlesUpdated$.asObservable();
  }
}
