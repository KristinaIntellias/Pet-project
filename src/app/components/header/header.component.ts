import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";
import { ArticlesService } from "../../services/articles.service";
import { ArticleWithoutId } from "../../models/article.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog, private articlesService: ArticlesService) { }

  openArticleDialog(): void {
    const articleDialogComponent = this.dialog.open(ArticleDialogComponent);

    articleDialogComponent.afterClosed().subscribe((article: ArticleWithoutId) => {
      console.log(article);

      this.articlesService.addArticles(article);
      this.articlesService.getArticles().subscribe(articles => {
        console.log(articles);
      })
    });
  };

}
