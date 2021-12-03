import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {Article} from "../../models/article.model";
import {icons} from "../../constants/icons";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input() article!: Article;
  @Output() actionEvent = new EventEmitter<number>();

  heart = icons.heart;

  addFavorite(): void {
    this.article.favorite++;
    this.actionEvent.emit(this.article.favorite);
  }
}
