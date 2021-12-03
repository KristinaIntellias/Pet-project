import {Component, EventEmitter, Output} from '@angular/core';

import { articles } from '../../mocks/articles.mock';
import {Article} from "../../models/article.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  @Output() articleEvent = new EventEmitter<number>();

  articles: Article[] = articles;
  sideBarText: string = '';
}
