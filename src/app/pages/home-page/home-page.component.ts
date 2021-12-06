import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Article } from "../../models/article.model";
import { ArticlesService } from "../../services/articles.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {
  constructor(private articlesService: ArticlesService) {}

  sideBarText: string = '';
  sub = new Subscription();

  @Input() articles!: Article[];

  articleEvent({id, favorite}: {id: string, favorite: number}): void {
    const sub = this.articlesService.increaseFavorite(id, favorite).subscribe(
      (response: Article[]) => this.articles = [...response]
    );

    this.sub.add(sub);
  }

  ngOnDestroy (): void {
    this.sub.unsubscribe();
  }

}
