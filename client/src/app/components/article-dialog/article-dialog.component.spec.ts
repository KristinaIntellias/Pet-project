import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ArticleDialogComponent } from './article-dialog.component';
import { user } from "../../mocks/user.mock";

describe('ArticleDialogComponent', () => {
  let component: ArticleDialogComponent;
  let fixture: ComponentFixture<ArticleDialogComponent>;
  let dialogRef: MatDialogRef<ArticleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDialogComponent   ],
      imports:[ MatDialogModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {author: user} },
        { provide: MatDialogRef, useValue: { close: () => {} } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    dialogRef = TestBed.inject(MatDialogRef);
    fixture = TestBed.createComponent(ArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with 3 controls', () => {
    expect(component.form.contains('title')).toBeTruthy();
    expect(component.form.contains('description')).toBeTruthy();
    expect(component.form.contains('content')).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.ngOnInit).toBeDefined();
    expect(component.submit).toBeDefined();
    expect(component.cancel).toBeDefined();
    expect(component.getErrorMessage).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
    expect(component.errorMap).toBeDefined();
  });

  it('should close dialog on trigger', () => {
    spyOn(dialogRef, 'close');
    component.submit();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
