import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  constructor(private articlesService: ArticlesService) {}

  public articles!: Article[];
  private sub = new Subscription();

  ngOnInit() {
    const sub = this.articlesService.getArticles().subscribe(
      (articles => this.articles = articles)
    );

    this.sub.add(sub);
  }

  articleEvent({id, favorite}: {id: string, favorite: number}): void {
    const sub = this.articlesService.increaseFavorite(id, favorite).subscribe(
      (response: Article[]) => this.articles = [...response]
    );

    this.sub.add(sub);
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }
}
