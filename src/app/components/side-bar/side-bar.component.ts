import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Tag } from "../../models/tag.model";
import { TagsService } from "../../services/tags.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(private tagsService: TagsService) {}

  public initialText = `Popular Tags No tags are here... yet.`;
  public tags!: Tag[];
  public length!: number;
  private sub!: Subscription;

  ngOnInit() {
    this.getTags();
  }

  ngOnDestroy (): void {
    this.sub?.unsubscribe();
  }

  private getTags(): void {
    this.sub = this.tagsService.getTags().subscribe((tags: Tag[]) => {
      this.tags = tags;
      this.length = this.tags.length;
    });
  }
}
