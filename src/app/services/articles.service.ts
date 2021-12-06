import { Injectable } from '@angular/core';
import { of, Observable } from "rxjs";

import { articles } from '../mocks/articles.mock';
import { Article, ArticleWithoutId } from "../models/article.model";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  articles: Article[] = articles;

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  addArticles(article: ArticleWithoutId): Observable<Article[]> {
    const newArticle = {id: Math.random().toString(36).substr(2, 5), ...article};
    this.articles = [...this.articles, newArticle];
    return of(this.articles);
  }

  increaseFavorite(id: string, favorite: number): Observable<Article[]> {
    this.articles = this.articles.map((article: Article) => article.id === id ? {...article, favorite} : article);
    return of(this.articles);
  }
}
