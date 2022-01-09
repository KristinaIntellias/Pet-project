import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Article } from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  public articlesUpdated$ = new Subject<Article[]>();
  private url = 'http://localhost:3000/api/posts';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.url, {...article, usersLike: []});
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(this.url, article);
  }

  deleteArticle({ _id }: Article): Observable<Article> {
    return this.http.delete<Article>(`${this.url}/${_id}`);
  }

  getArticleUpdateListener() {
    return this.articlesUpdated$.asObservable();
  }
}
