import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { ArticlesService } from './articles.service';
import { article, articles } from "../mocks/articles.mock";
import { Article } from "../models/article.model";

describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpMock: HttpTestingController;

  const mockArticles = articles;
  const mockArticle: Article = article;

  const status = 500;
  const statusText = 'Server error';
  const errorEvent = new ErrorEvent('API error');
  let actualError: HttpErrorResponse | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService],
    }).compileComponents();
    service = TestBed.inject(ArticlesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve articles from API via GET', () => {
    let newArticles: Article[] | undefined;
    service.getArticles().subscribe(articles => newArticles = articles)

    const req = httpMock.expectOne(`${service.url}`);
    expect(req.request.method).toBe('GET');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: mockArticles });
    req.event(expectedResponse);

    req.flush(mockArticles);

    expect(newArticles?.length).toBe(2);
    expect(newArticles).toEqual(mockArticles);
  });

  it('passes through errors method getArticles', () => {
    service.getArticles().subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: (error) => {
        actualError = error;
      },
      complete: () => {
        fail('complete handler must not be called');
      },
    });

    httpMock.expectOne(`${service.url}`).error(errorEvent, { status, statusText });
    errorExecution();
  });

  it('should add article to API via POST', () => {
    let newArticle: Article | undefined;
    service.addArticle(mockArticle).subscribe((article: Article) => newArticle = article);

    const req = httpMock.expectOne(`${service.url}`);
    expect(req.request.method).toBe('POST');

    const expectedResponse = new HttpResponse({ status: 201, statusText: 'Created', body: mockArticle });
    req.event(expectedResponse);

    req.flush(mockArticle);

    expect(newArticle).toEqual(mockArticle)
  });

  it('passes through errors method addArticle', () => {
    service.addArticle(mockArticle).subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: (error) => {
        actualError = error;
      },
      complete: () => {
        fail('complete handler must not be called');
      },
    });

    httpMock.expectOne(`${service.url}`).error(errorEvent, { status, statusText });
    errorExecution();
  });

  it('should update article to API via PUT', () => {
    let newArticle: Article | undefined;
    service.updateArticle(mockArticle).subscribe((article: Article) => newArticle = article);

    const req = httpMock.expectOne(`${service.url}`);
    expect(req.request.method).toBe('PUT');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: mockArticle });
    req.event(expectedResponse);

    req.flush(mockArticle);

    expect(newArticle).toEqual(mockArticle)
  });

  it('passes through errors method updateArticle', () => {
    service.updateArticle(mockArticle).subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: (error) => {
        actualError = error;
      },
      complete: () => {
          fail('complete handler must not be called');
      },
    });

    httpMock.expectOne(`${service.url}`).error(errorEvent, { status, statusText });
    errorExecution();
  });

  it('should delete article to API via DELETE', () => {
    let newArticle: Article | undefined;
    service.deleteArticle(mockArticle).subscribe((article: Article) => newArticle = article);

    const req = httpMock.expectOne(`${service.url}/${mockArticle._id}`);
    expect(req.request.method).toBe('DELETE');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: mockArticle });
    req.event(expectedResponse);

    req.flush(mockArticle);

    expect(newArticle).toEqual(mockArticle)
  });

  it('passes through errors method deleteArticle', () => {
    service.deleteArticle(mockArticle).subscribe({
      next: () => {
        fail('next handler must not be called');
      },
      error: (error) => {
        actualError = error;
      },
      complete: () => {
        fail('complete handler must not be called');
      },
    });

    httpMock.expectOne(`${service.url}/${mockArticle._id}`).error(errorEvent, { status, statusText });
    errorExecution();
  });

  it('should filter articles by tag', () => {
    let newArticles: Article[] | undefined;
    const tegText = 'test';
    service.filterByTag(tegText).subscribe((articles: Article[]) =>
      newArticles = articles.filter(article => article.tags?.includes(tegText))
    );

    const req = httpMock.expectOne(`${service.url}?tags=${tegText}`);
    expect(req.request.method).toBe('GET');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: mockArticles });
    req.event(expectedResponse);

    req.flush(mockArticles);

    expect(newArticles?.length).toBe(1);
    expect(newArticles).toEqual(mockArticles.slice(0, 1));
  });

  it('should normalize articles data', () => {
    let newArticles: Article[] | undefined;
    const id: string = String(mockArticles[1].author._id);
    service.normalizeArticles(mockArticles, id).subscribe((articles: Article[]) =>
    newArticles = articles
      .filter((article: Article) => !!article.author)
      .map((article: Article) => {
        return {...article, isOwner: id === article.author._id}
      })
    )
    mockArticles[1].isOwner = true;
    expect(newArticles?.length).toBe(2);
    expect(newArticles).toEqual(mockArticles);
  });

  function errorExecution() {
    if (!actualError) {
      throw new Error('Error needs to be defined');
    }

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  }
});
