import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HeaderComponent } from './header.component';
import { routes } from "../../app-routing.module";
import { ArticleDialogComponent } from "../article-dialog/article-dialog.component";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatDialogModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ ArticleDialogComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call openDialog', () => {
    expect(component.openArticleDialog).toBeTruthy();
    component.openArticleDialog();
    fixture.detectChanges();
    const title = 'Adding a new article';
    const articleDialogComponentTitle = document.querySelector('h2') as HTMLElement;
    expect(articleDialogComponentTitle.innerText).toEqual(title);
  });
});
