import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { ArticleWithoutId } from "../../models/article.model";

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {
  form!: FormGroup;

  constructor(public dialogRef: MatDialogRef<ArticleDialogComponent>) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = new FormGroup({
      author: new FormControl('', [Validators.minLength(2), Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl(''),
    });
  }

  submit() {
    this.dialogRef.close({ date: Date.now(), favorite: 0, ...this.form.value} as ArticleWithoutId);
  }

  cancel() {
    this.dialogRef.close();
  }
}
