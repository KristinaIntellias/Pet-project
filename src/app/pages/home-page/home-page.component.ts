import {Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Article } from "../../models/article.model";
import { ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(private articlesService: ArticlesService) {}

  articles: Article[] = [];
  sideBarText: string = '';
  sub = new Subscription();

  ngOnInit(): void {
    this.getArticles();
  }

  articleEvent({id, favorite}: {id: string, favorite: number}): void {
    this.articlesService.increaseFavorite(id, favorite);
  }

  ngOnDestroy (): void {
    this.sub.unsubscribe();
  }

  private getArticles(): void {
    const sub = this.articlesService
      .getArticles().subscribe(
        (response: Article[]) => {
          this.articles = [...response];
        });

    this.sub.add(sub);
  }
}
