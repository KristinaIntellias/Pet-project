import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Article } from "../../models/article.model";
import { ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
    `:host {
      display: grid;
      grid-template-columns: 1fr 327px;
    }`,
  ]
})
export class HomePageComponent implements OnDestroy {
  constructor(private articlesService: ArticlesService) {}

  public sideBarText: string = '';
  private sub!: Subscription;

  @Input() articles!: Article[];

  articleEvent({id, favorite}: {id: string, favorite: number}): void {
    this.sub = this.articlesService.increaseFavorite(id, favorite).subscribe(
      (response: Article[]) => this.articles = [...response]
    );
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }
}
