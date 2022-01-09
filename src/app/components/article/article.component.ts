import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Article } from "../../models/article.model";
import { icons } from "../../constants/icons";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  heart = icons.heart;
  pencil = icons.pencil;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'heart',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.heart)
    );
  }

  @Input() article!: Article;
  @Output() toggleFavorite = new EventEmitter<Article>();
  @Output() editArticle = new EventEmitter<Article>();
  @Output() deleteArticle = new EventEmitter<Article>();
}
