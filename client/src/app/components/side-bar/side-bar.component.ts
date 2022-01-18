import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";

import { Tag } from "../../models/tag.model";
import { TagsService } from "../../services/tags.service";
import { ArticlesService } from "../../services/articles.service";
import { Article } from "../../models/article.model";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(
    private articlesService: ArticlesService,
    private tagsService: TagsService,
    private userService: UserService
    ) {}

  public initialText = `No tags are here... yet.`;
  public tags!: Tag[];
  private user!: User;
  private sub = new Subscription();

  ngOnInit() {
    this.getTags();
    this.getUser();
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  filterByTag(tag: Tag): void {
    const sub = this.articlesService.filterByTag(tag.text.toLocaleLowerCase())
      .pipe(
        switchMap((articles: Article[]) => this.articlesService.normalizeArticles(articles, this.user._id)),
      )
      .subscribe((articles: Article[]) => this.articlesService.articlesUpdated$.next([...articles]));

    this.sub.add(sub);
  }

  unFilterByTag(): void {
    const sub = this.articlesService.getArticles()
      .pipe(
        switchMap((articles: Article[]) => this.articlesService.normalizeArticles(articles, this.user._id)),
      )
      .subscribe((articles: Article[]) => this.articlesService.articlesUpdated$.next([...articles]));

    this.sub.add(sub);
  }

  private getTags(): void {
    const sub = this.tagsService.getTags().subscribe((tags: Tag[]) => this.tags = tags);

    this.sub.add(sub);
  }

  private getUser(): void {
    const sub = this.userService.getUser().subscribe((user: User | null) => {
      if (!!user) {
        this.user = user
      }
    });

    this.sub.add(sub);
  }
}
