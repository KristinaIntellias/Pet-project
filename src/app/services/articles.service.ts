import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from "rxjs";

import { articles } from '../mocks/articles.mock';
import { Article, ArticleWithoutId } from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[] = articles;
  private articles$ = new ReplaySubject<Article[]>();

  getArticles(): Observable<Article[]> {
    this.articles$.next(this.articles);
    return this.articles$;
  }

  addArticles(article: ArticleWithoutId): Observable<Article[]> {
    this.articles$.subscribe(articles =>
      this.articles = [...articles, {id: Math.random().toString(36).substr(2, 5), ...article}]
    );
    this.articles$.next(this.articles);
    return this.articles$;
  }

  increaseFavorite(id: string, favorite: number): Observable<Article[]> {
    this.articles$.subscribe(articles =>
      this.articles = articles.map((article: Article) => article.id === id ? {...article, favorite} : article)
    );
    this.articles$.next(this.articles);
    return this.articles$;
  }
}
