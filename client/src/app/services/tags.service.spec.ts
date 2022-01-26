import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

import { TagsService } from './tags.service';
import { Tag } from "../models/tag.model";
import { tags } from "../mocks/tags.mock";

describe('TagsService', () => {
  let service: TagsService;
  let httpMock: HttpTestingController;

  const mockTags: Tag[] = tags;

  const status = 500;
  const statusText = 'Server error';
  const errorEvent = new ErrorEvent('API error');
  let actualError: HttpErrorResponse | undefined;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagsService],
    }).compileComponents();
    service = TestBed.inject(TagsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve tags from API via GET', () => {
    let newTags: Tag[] | undefined;
    service.getTags().subscribe(tags => newTags = tags)

    const req = httpMock.expectOne(`${service.url}`);
    expect(req.request.method).toBe('GET');

    const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: mockTags });
    req.event(expectedResponse);

    req.flush(mockTags);

    expect(newTags?.length).toBe(2);
    expect(newTags).toEqual(mockTags);
  });

  it('passes through errors method getTags', () => {
    service.getTags().subscribe({
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

    if (!actualError) {
      throw new Error('Error needs to be defined');
    }

    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
