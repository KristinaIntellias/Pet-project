import { Component } from '@angular/core';
import { Subscription } from "rxjs";

import { ArticlesService } from "./services/articles.service";
import { Article } from "./models/article.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private articlesService: ArticlesService) {}

  articles: Article[] = [];
  sub = new Subscription();

  ngOnInit(): void {
    this.getArticles();
  }

  ngOnDestroy (): void {
    this.sub.unsubscribe();
  }

  headerEvent(articles: Article[]): void {
    this.articles = [...articles];
  }

  private getArticles(): void {
    const sub = this.articlesService.getArticles().subscribe(
      (response: Article[]) => this.articles = [...response]
    );

    this.sub.add(sub);
  }
}
