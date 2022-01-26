import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { article } from "../../mocks/articles.mock";

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render article', () => {
    component.article = article;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.author').innerText)
      .toEqual(`${article.author.firstName} ${article.author.lastName}`);
  });
})
