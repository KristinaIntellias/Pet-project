import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Article } from "../../models/article.model";
import { icons } from "../../constants/icons";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article!: Article;
  @Output() increaseFavorite = new EventEmitter<{id: string, favorite: number}>();

  heart = icons.heart;
}
